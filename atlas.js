import reference from './reference.js'
import historicalReference from './historical-reference.js'

const latestVersion = '3.2'
const references = new Map([[latestVersion, reference], ...Object.entries(historicalReference)])
const classes = new Map()
const relationships = new Map()
let version
let nodes
let edges
let families
let root
const nodeViews = new Map()
const edgeViews = new Map()
const $ = id => document.getElementById(id)
const svgNS = 'http://www.w3.org/2000/svg'
const viewport = $('viewport')
const world = $('world')
const details = $('details')
const inspector = $('inspector')
const tabs = inspector.querySelector('.inspector-tabs')
const heading = $('inspector-heading')
const footer = $('inspector-footer')
const search = $('class-search')
const results = $('search-results')
const familyBar = $('families')
const filterBar = document.querySelector('.edge-filters')
const versionButton = $('version-button')
const versionMenu = $('version-menu')
const nodeWidth = 126
const nodeHeight = 40
const plotWidth = Number($('edges').getAttribute('width'))
const plotHeight = Number($('edges').getAttribute('height'))
const maxScale = 2.8
const minScale = .18
const frameTypePages = {
  Button: 'UIOBJECT_Button',
  CheckButton: 'UIOBJECT_CheckButton',
  DropdownButton: 'INTRINSIC_DropdownButton',
  EditBox: 'UIOBJECT_EditBox',
  Frame: 'UIOBJECT_Frame',
  Slider: 'UIOBJECT_Slider'
}

const camera = { x: 0, y: 0, scale: 1, fitted: true }
const pointers = new Map()
let moved = false
let family = null
let edgeFilter = 'all'
let selected
let currentTab = 'docs'
let matches = []
let activeResult = -1
let size

function svg(tag, attributes = {}) {
  const element = document.createElementNS(svgNS, tag)
  for (const [name, value] of Object.entries(attributes)) element.setAttribute(name, value)
  return element
}

function icon(id) {
  const symbol = svg('svg', { class: 'icon', 'aria-hidden': 'true' })
  symbol.append(svg('use', { href: '#i-' + id }))
  return symbol
}

function create(tag, className, content) {
  const element = document.createElement(tag)
  if (className) element.className = className
  if (content) element.textContent = content
  return element
}

function familyClass(name) {
  return 'family-' + name.toLowerCase()
}

function familyDot() {
  return create('span', 'family-dot')
}

function externalLink(text, href, className, symbol) {
  const link = create('a', className)
  if (symbol) link.append(icon(symbol))
  link.append(text)
  link.href = href
  link.target = '_blank'
  link.rel = 'noopener noreferrer'
  return link
}

function inheritanceRoute(edge) {
  const child = classes.get(edge.from)
  const parent = classes.get(edge.to)
  const siblings = nodes.filter(node => node.parent === parent.id).sort((a, b) => a.y - b.y)
  const port = (siblings.indexOf(child) - (siblings.length - 1) / 2) * 4.5
  const startY = child.y + nodeHeight / 2
  const endY = parent.y + nodeHeight / 2 + port
  const startX = child.x
  const endX = parent.x + nodeWidth
  const midX = (startX + endX) / 2
  return `M${startX} ${startY} C${midX} ${startY} ${midX} ${endY} ${endX} ${endY}`
}

function buildGraph() {
  const sortNodes = (a, b) => a.x - b.x || a.y - b.y
  for (const node of [...nodes].sort(sortNodes)) {
    const button = create('button', 'node ' + familyClass(node.family), node.id)
    button.type = 'button'
    button.title = node.id + ' · ' + node.family
    button.style.left = node.x + 'px'
    button.style.top = node.y + 'px'
    button.dataset.node = node.id
    if (node.id.length >= 15) button.classList.add('long-name')
    button.addEventListener('click', () => selectNode(node.id))
    button.addEventListener('focus', () => ensureNodeVisible(node))
    $('nodes').append(button)
    nodeViews.set(node.id, button)
  }

  for (const edge of edges) {
    const label = edge.from + (edge.type === 'inheritance' ? ' inherits from ' : ' uses ') + edge.to
    const group = svg('g', { class: 'edge', 'data-type': edge.type, 'data-edge': edge.id, role: 'button', tabindex: 0, 'aria-label': label })
    const title = svg('title')
    title.textContent = label
    const route = edge.route || inheritanceRoute(edge)
    group.append(title, svg('path', { d: route, class: 'edge-line' }), svg('path', { d: route, class: 'edge-hit' }))
    group.addEventListener('click', () => selectEdge(edge.id))
    group.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        selectEdge(edge.id)
      }
    })
    $('edges').append(group)
    edgeViews.set(edge.id, group)
  }

  for (const name of families) {
    const button = create('button', 'family-button ' + familyClass(name))
    button.type = 'button'
    button.dataset.family = name
    button.setAttribute('aria-pressed', 'false')
    button.append(familyDot(), name)
    button.addEventListener('click', () => {
      family = family === name ? null : name
      updateGraph()
      announce(family ? 'Highlighted ' + family + ' classes' : 'Showing all class families')
    })
    familyBar.append(button)
  }
}

function updateGraph() {
  const activeEdge = selected.type ? selected : null
  const endpoints = activeEdge ? [activeEdge.from, activeEdge.to] : []
  for (const node of nodes) {
    const view = nodeViews.get(node.id)
    const active = !activeEdge && selected.id === node.id
    const endpoint = endpoints.includes(node.id)
    view.classList.toggle('is-selected', active)
    view.classList.toggle('is-endpoint', endpoint)
    view.classList.toggle('is-muted', !!family && family !== node.family && !active && !endpoint)
    view.setAttribute('aria-pressed', String(active))
  }

  for (const edge of edges) {
    const view = edgeViews.get(edge.id)
    const active = edge.id === activeEdge?.id
    const related = [edge.from, edge.to].some(id => classes.get(id).family === family)
    view.toggleAttribute('hidden', edgeFilter !== 'all' && edgeFilter !== edge.type)
    view.classList.toggle('is-selected', active)
    view.classList.toggle('is-muted', !!family && !related && !active)
    view.setAttribute('aria-pressed', String(active))
  }

  for (const button of familyBar.querySelectorAll('button')) {
    button.setAttribute('aria-pressed', String(family === button.dataset.family))
  }
  for (const button of filterBar.querySelectorAll('button')) {
    button.setAttribute('aria-pressed', String(edgeFilter === button.dataset.filter))
  }
}

function updateCamera() {
  world.style.transform = `translate(${camera.x}px, ${camera.y}px) scale(${camera.scale})`
  $('zoom-level').textContent = Math.round(camera.scale * 100) + '%'
  $('zoom-in').disabled = camera.scale >= maxScale
  $('zoom-out').disabled = camera.scale <= minScale
}

function fitGraph() {
  const { clientWidth: width, clientHeight: height } = viewport
  if (!width || !height) return
  const graphWidth = version === '3.0' ? 1062 : plotWidth
  camera.scale = Math.min((width - 28) / graphWidth, (height - 26) / plotHeight, 1.45)
  camera.x = (width - graphWidth * camera.scale) / 2
  camera.y = (height - plotHeight * camera.scale) / 2
  camera.fitted = true
  size = { width, height }
  updateCamera()
}

function zoomAt(scale, x = viewport.clientWidth / 2, y = viewport.clientHeight / 2) {
  scale = Math.max(minScale, Math.min(maxScale, scale))
  const ratio = scale / camera.scale
  camera.x = x - (x - camera.x) * ratio
  camera.y = y - (y - camera.y) * ratio
  camera.scale = scale
  camera.fitted = false
  updateCamera()
}

function centerNode(node, scale = camera.scale) {
  camera.scale = scale
  camera.x = viewport.clientWidth / 2 - (node.x + nodeWidth / 2) * scale
  camera.y = viewport.clientHeight / 2 - (node.y + nodeHeight / 2) * scale
  camera.fitted = false
  updateCamera()
}

function ensureNodeVisible(node) {
  const x = camera.x + (node.x + nodeWidth / 2) * camera.scale
  const y = camera.y + (node.y + nodeHeight / 2) * camera.scale
  const horizontalMargin = nodeWidth * camera.scale / 2 + 6
  const verticalMargin = nodeHeight * camera.scale / 2 + 6
  if (x < horizontalMargin || x > viewport.clientWidth - horizontalMargin ||
      y < verticalMargin || y > viewport.clientHeight - verticalMargin) {
    centerNode(node)
  }
}

function localPoint(event) {
  const bounds = viewport.getBoundingClientRect()
  return { x: event.clientX - bounds.left, y: event.clientY - bounds.top }
}

function midpoint(first, second) {
  return { x: (first.x + second.x) / 2, y: (first.y + second.y) / 2 }
}

function distance(first, second) {
  return Math.hypot(first.x - second.x, first.y - second.y)
}

function startPan(event) {
  if (event.button !== 0 || event.target.closest('.zoom-controls')) return
  const point = localPoint(event)
  if (!pointers.size) moved = false
  pointers.set(event.pointerId, { ...point, start: point })
  if (pointers.size > 1) beginGesture()
}

function beginGesture() {
  moved = true
  viewport.classList.add('is-panning')
  for (const id of pointers.keys()) viewport.setPointerCapture(id)
}

function pan(event) {
  const previous = pointers.get(event.pointerId)
  if (!previous) return
  const point = localPoint(event)
  if (!moved && distance(previous.start, point) < 4) return
  if (!moved) beginGesture()
  const other = Array.from(pointers.entries()).find(([id]) => id !== event.pointerId)?.[1]
  pointers.set(event.pointerId, { ...point, start: previous.start })
  if (other) {
    const before = midpoint(previous, other)
    const after = midpoint(point, other)
    const ratio = distance(point, other) / Math.max(1, distance(previous, other))
    zoomAt(camera.scale * ratio, before.x, before.y)
    camera.x += after.x - before.x
    camera.y += after.y - before.y
  } else {
    camera.x += point.x - previous.x
    camera.y += point.y - previous.y
  }
  camera.fitted = false
  updateCamera()
}

function stopPan(event) {
  pointers.delete(event.pointerId)
  if (!pointers.size) viewport.classList.remove('is-panning')
}

function announce(message) {
  $('announcement').textContent = message
}

function selectNode(id, focusView = false, updateHash = true) {
  if (!classes.has(id)) return
  selected = classes.get(id)
  currentTab = 'docs'
  if (focusView) {
    if (family && selected.family !== family) family = null
    centerNode(selected, Math.max(camera.scale, .9))
  }
  renderInspector()
  updateGraph()
  if (updateHash) history.replaceState(null, '', '#' + id)
  announce(id + ' documentation opened')
}

function selectEdge(id, updateHash = true) {
  if (!relationships.has(id)) return
  selected = relationships.get(id)
  if (edgeFilter !== 'all' && edgeFilter !== selected.type) edgeFilter = 'all'
  renderInspector()
  updateGraph()
  if (updateHash) history.replaceState(null, '', '#edge-' + id)
  announce(selected.from + ' and ' + selected.to + ' relationship opened')
}

function restoreSelection() {
  const hash = location.hash.slice(1)
  if (hash.startsWith('edge-') && relationships.has(hash.slice(5))) {
    selectEdge(hash.slice(5), false)
  } else {
    selectNode(classes.has(hash) ? hash : root, false, false)
  }
}

function showClass(id) {
  selectNode(id)
  ensureNodeVisible(classes.get(id))
}

function directionLabel(edge, id) {
  if (edge.type === 'inheritance') return edge.from === id ? 'Inherits from' : 'Superclass of'
  return edge.from === id ? 'Uses' : 'Used by'
}

function classRelationships(id) {
  return edges.filter(edge => edge.from === id || edge.to === id)
    .sort((a, b) => Number(b.from === id) - Number(a.from === id) ||
      a.type.localeCompare(b.type) || a.from.localeCompare(b.from) || a.to.localeCompare(b.to))
}

function renderClassRelationships(nodeLinks) {
  const list = create('ul', 'relationship-list')
  for (const edge of nodeLinks) {
    const id = edge.from === selected.id ? edge.to : edge.from
    const row = create('li')
    const button = create('button', 'relationship-item')
    button.type = 'button'
    button.append(create('span', null, directionLabel(edge, selected.id)), create('strong', null, id))
    button.addEventListener('click', () => selectEdge(edge.id))
    row.append(button)
    list.append(row)
  }
  details.replaceChildren(list)
}

function renderClass(node) {
  const pills = create('div', 'class-pills')
  const label = create('span', 'pill family-pill ' + familyClass(node.family))
  label.append(familyDot(), node.family)
  pills.append(label)
  if (node.abstract) pills.append(create('span', 'pill', 'Abstract'))
  else if (node.kind) {
    const page = frameTypePages[node.kind]
    const tag = page ? externalLink(node.kind, 'https://warcraft.wiki.gg/wiki/' + page, 'pill frame-type') :
      create('span', 'pill', node.kind)
    if (page) tag.append(icon('external-link'))
    pills.append(tag)
  }
  heading.replaceChildren(pills, create('h2', null, node.id), create('p', null, node.summary))

  const nodeLinks = classRelationships(node.id)
  $('link-count').textContent = nodeLinks.length
  $('tab-docs').setAttribute('aria-selected', String(currentTab === 'docs'))
  $('tab-links').setAttribute('aria-selected', String(currentTab === 'links'))
  $('tab-docs').tabIndex = currentTab === 'docs' ? 0 : -1
  $('tab-links').tabIndex = currentTab === 'links' ? 0 : -1
  details.setAttribute('role', 'tabpanel')
  details.setAttribute('aria-labelledby', 'tab-' + currentTab)
  if (currentTab === 'docs') {
    details.innerHTML = node.doc
  } else {
    renderClassRelationships(nodeLinks)
  }
  footer.replaceChildren(externalLink('View source', node.source, 'source-link', 'code'))
}

function renderEdge(edge) {
  const inherits = edge.type === 'inheritance'
  heading.replaceChildren(
    create('span', 'pill relationship-pill', inherits ? 'Inheritance' : 'Composition'),
    create('h2', null, edge.from + (inherits ? ' inherits from ' : ' uses ') + edge.to)
  )
  const description = create('p', null, edge.description)
  const method = create('code', null, edge.method)
  const definition = create('p')
  definition.append(inherits ? 'Registered with ' : 'Created in ', method)
  const endpoints = create('div')
  for (const [id, label] of [[edge.from, inherits ? 'Subclass' : 'Creates the widget'], [edge.to, inherits ? 'Superclass' : 'Widget created']]) {
    const row = create('div', 'relationship-endpoint')
    const button = create('button', null, id)
    button.type = 'button'
    button.addEventListener('click', () => showClass(id))
    row.append(create('span', null, label), button)
    endpoints.append(row)
  }
  details.setAttribute('role', 'region')
  details.setAttribute('aria-labelledby', 'inspector-label')
  details.replaceChildren(description, definition, create('h3', null, 'Connected classes'), endpoints)
  footer.replaceChildren(externalLink('View relationship in source', edge.source, 'source-link', 'code'))
}

function renderInspector() {
  const isEdge = !!selected.type
  $('inspector-label').textContent = isEdge ? 'Relationship reference' : 'Class reference'
  $('inspector-icon').setAttribute('href', isEdge ? '#i-nodes' : '#i-file')
  tabs.hidden = isEdge
  if (isEdge) renderEdge(selected)
  else renderClass(selected)
  details.scrollTop = 0
}

function closeSearch() {
  results.hidden = true
  search.setAttribute('aria-expanded', 'false')
  search.removeAttribute('aria-activedescendant')
}

function resultScore(node, query) {
  const name = node.id.toLowerCase()
  const aliases = node.aliases.map(alias => alias.toLowerCase())
  if (name === query || aliases.includes(query)) return 0
  if (name.startsWith(query) || aliases.some(alias => alias.startsWith(query))) return 1
  if (name.includes(query) || aliases.some(alias => alias.includes(query))) return 2
  return 3
}

function renderSearch() {
  const query = search.value.trim().toLowerCase()
  if (!query) {
    matches = []
    closeSearch()
    return
  }
  matches = nodes.map(node => ({ node, score: resultScore(node, query) }))
    .filter(match => match.score < 3)
    .sort((a, b) => a.score - b.score || a.node.id.localeCompare(b.node.id))
    .map(match => match.node)
  results.replaceChildren()
  activeResult = -1
  search.removeAttribute('aria-activedescendant')
  for (const [index, node] of matches.entries()) {
    const option = create('div', 'search-result ' + familyClass(node.family))
    option.id = 'search-option-' + index
    option.dataset.node = node.id
    option.setAttribute('role', 'option')
    option.setAttribute('aria-selected', 'false')
    const label = node.aliases.some(alias => alias.toLowerCase().includes(query)) ? node.id + ' · ' + node.aliases[0] : node.id
    option.append(familyDot(), label, create('small', null, node.family))
    results.append(option)
  }
  if (!matches.length) results.append(create('p', 'search-empty', 'No matching classes'))
  results.hidden = false
  search.setAttribute('aria-expanded', 'true')
  announce(matches.length ? matches.length + ' matching classes' : 'No matching classes')
}

function chooseResult(id) {
  search.value = ''
  closeSearch()
  selectNode(id, true)
  nodeViews.get(id).focus({ preventScroll: true })
}

function navigateSearch(event) {
  if (event.key === 'Escape') {
    closeSearch()
    return
  }
  if (results.hidden || !matches.length) return
  if (event.key === 'Enter') {
    event.preventDefault()
    chooseResult(matches[Math.max(0, activeResult)].id)
  }
  if (event.key !== 'ArrowUp' && event.key !== 'ArrowDown') return
  event.preventDefault()
  const change = event.key === 'ArrowUp' ? -1 : 1
  const index = activeResult < 0 && change < 0 ? matches.length - 1 :
    (activeResult + change + matches.length) % matches.length
  const options = Array.from(results.querySelectorAll('[role=option]'))
  options[activeResult]?.setAttribute('aria-selected', 'false')
  const next = options[index]
  activeResult = index
  next.setAttribute('aria-selected', 'true')
  search.setAttribute('aria-activedescendant', next.id)
  next.scrollIntoView({ block: 'nearest' })
}

function bindGraph() {
  viewport.addEventListener('pointerdown', startPan)
  viewport.addEventListener('pointermove', pan)
  viewport.addEventListener('pointerup', stopPan)
  viewport.addEventListener('pointercancel', stopPan)
  viewport.addEventListener('lostpointercapture', stopPan)
  viewport.addEventListener('click', event => {
    if (!moved || event.detail === 0) return
    event.stopPropagation()
    moved = false
  }, true)
  viewport.addEventListener('wheel', event => {
    if (event.target.closest('.zoom-controls')) return
    event.preventDefault()
    const point = localPoint(event)
    const delta = event.deltaMode === 1 ? event.deltaY * 16 : event.deltaY
    zoomAt(camera.scale * Math.exp(-Math.min(200, Math.max(-200, delta)) * .0024), point.x, point.y)
  }, { passive: false })
  viewport.addEventListener('keydown', event => {
    if (event.target !== viewport) return
    const moves = { ArrowLeft: [48, 0], ArrowRight: [-48, 0], ArrowUp: [0, 48], ArrowDown: [0, -48] }
    if (moves[event.key]) {
      event.preventDefault()
      camera.x += moves[event.key][0]
      camera.y += moves[event.key][1]
      camera.fitted = false
      updateCamera()
    } else if (['+', '=', '-', '0', 'Home'].includes(event.key)) {
      event.preventDefault()
      if (event.key === '0' || event.key === 'Home') fitGraph()
      else zoomAt(camera.scale * (event.key === '-' ? .8 : 1.25))
    }
  })
  $('zoom-in').addEventListener('click', () => zoomAt(camera.scale * 1.25))
  $('zoom-out').addEventListener('click', () => zoomAt(camera.scale / 1.25))
  $('fit').addEventListener('click', fitGraph)
  filterBar.addEventListener('click', event => {
    const button = event.target.closest('[data-filter]')
    if (!button) return
    edgeFilter = button.dataset.filter
    updateGraph()
  })

  new ResizeObserver(() => {
    const next = { width: viewport.clientWidth, height: viewport.clientHeight }
    if (!size || camera.fitted) {
      fitGraph()
    } else {
      camera.x += (next.width - size.width) / 2
      camera.y += (next.height - size.height) / 2
      size = next
      updateCamera()
    }
  }).observe(viewport)
}

function bindInspector() {
  tabs.addEventListener('click', event => {
    const tab = event.target.closest('[role=tab]')
    if (!tab) return
    currentTab = tab.id === 'tab-docs' ? 'docs' : 'links'
    renderInspector()
  })
  tabs.addEventListener('keydown', event => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return
    event.preventDefault()
    if (event.key === 'Home') currentTab = 'docs'
    else if (event.key === 'End') currentTab = 'links'
    else currentTab = currentTab === 'docs' ? 'links' : 'docs'
    renderInspector()
    $('tab-' + currentTab).focus()
  })
  details.addEventListener('click', event => {
    const link = event.target.closest('[data-class]')
    if (!link || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    showClass(link.dataset.class)
    details.focus({ preventScroll: true })
  })
}

function bindSearch() {
  search.addEventListener('input', renderSearch)
  search.addEventListener('focus', renderSearch)
  search.addEventListener('keydown', navigateSearch)
  results.addEventListener('click', event => {
    const option = event.target.closest('[data-node]')
    if (option) chooseResult(option.dataset.node)
  })
  document.addEventListener('click', event => {
    if (!event.target.closest('.search')) closeSearch()
  })
  document.addEventListener('focusin', event => {
    if (!event.target.closest('.search')) closeSearch()
  })
  document.addEventListener('keydown', event => {
    if (event.key === '/' && !event.ctrlKey && !event.metaKey && !event.altKey &&
        !event.target.closest('input, textarea, [contenteditable]')) {
      event.preventDefault()
      search.focus()
    }
  })
}

function loadVersion(nextVersion) {
  const data = references.get(nextVersion)
  version = nextVersion
  nodes = data.nodes
  edges = data.edges
  families = data.families
  root = data.root ?? 'Base'
  family = null
  edgeFilter = 'all'
  search.value = ''
  closeSearch()

  classes.clear()
  relationships.clear()
  nodeViews.clear()
  edgeViews.clear()
  $('nodes').replaceChildren()
  for (const element of $('edges').querySelectorAll('.edge')) element.remove()
  familyBar.replaceChildren()
  for (const node of nodes) classes.set(node.id, node)
  for (const edge of edges) relationships.set(edge.id, edge)

  $('version-number').textContent = version
  versionButton.setAttribute('aria-label', 'Sushi version ' + version)
  for (const option of versionMenu.children) {
    option.setAttribute('aria-checked', String(option.dataset.version === version))
  }
  $('class-count').textContent = nodes.length
  $('relationship-count').textContent = edges.length
  $('source-version').textContent = 'Sushi-' + version
  $('commit-link').textContent = data.commit.slice(0, 7)
  $('commit-link').href = data.repository + '/commit/' + data.commit
  buildGraph()
  fitGraph()
  restoreSelection()
}

function versionFromUrl() {
  const requested = new URLSearchParams(location.search).get('version')
  return references.has(requested) ? requested : latestVersion
}

function closeVersionMenu(restoreFocus = false) {
  versionMenu.hidden = true
  versionButton.setAttribute('aria-expanded', 'false')
  if (restoreFocus) versionButton.focus()
}

function openVersionMenu(index) {
  versionMenu.hidden = false
  versionButton.setAttribute('aria-expanded', 'true')
  const option = versionMenu.children[index] ?? versionMenu.querySelector('[aria-checked="true"]')
  option?.focus()
}

function chooseVersion(nextVersion) {
  closeVersionMenu(true)
  if (version === nextVersion) return
  const url = new URL(location.href)
  if (nextVersion === latestVersion) url.searchParams.delete('version')
  else url.searchParams.set('version', nextVersion)
  url.hash = ''
  history.pushState(null, '', url)
  loadVersion(nextVersion)
  announce('Showing Sushi ' + version)
}

function bindVersions() {
  for (const key of references.keys()) {
    const option = create('button', null, key + (key === latestVersion ? ' (current)' : ''))
    option.type = 'button'
    option.tabIndex = -1
    option.setAttribute('role', 'menuitemradio')
    option.dataset.version = key
    option.addEventListener('click', () => chooseVersion(key))
    versionMenu.append(option)
  }
  versionButton.addEventListener('click', () => {
    if (versionMenu.hidden) openVersionMenu()
    else closeVersionMenu()
  })
  versionButton.addEventListener('keydown', event => {
    if (!['ArrowDown', 'ArrowUp'].includes(event.key)) return
    event.preventDefault()
    openVersionMenu(event.key === 'ArrowDown' ? 0 : versionMenu.children.length - 1)
  })
  versionMenu.addEventListener('keydown', event => {
    const options = Array.from(versionMenu.children)
    const index = options.indexOf(document.activeElement)
    if (event.key === 'Escape') {
      event.preventDefault()
      closeVersionMenu(true)
    } else if (event.key === 'Tab') {
      closeVersionMenu(true)
    } else if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault()
      options[event.key === 'Home' ? 0 : options.length - 1].focus()
    } else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
      const change = event.key === 'ArrowDown' ? 1 : -1
      options[(index + change + options.length) % options.length].focus()
    }
  })
  document.addEventListener('click', event => {
    if (!versionMenu.hidden && !event.target.closest('.version-picker')) closeVersionMenu()
  })
  window.addEventListener('popstate', () => {
    const nextVersion = versionFromUrl()
    if (version !== nextVersion) loadVersion(nextVersion)
  })
}

function main() {
  $('commit-link').title = 'Source commit'
  bindVersions()
  bindGraph()
  bindInspector()
  bindSearch()
  loadVersion(versionFromUrl())
  window.addEventListener('hashchange', restoreSelection)
}

main()
