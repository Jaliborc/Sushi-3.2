const path = require('path')
const PROJ = 'C:/Users/Jaliborc/Files/Work/Teaching/course-notes-app'
const Module = require('module')
const origResolve = Module._resolveLookupPaths
Module._resolveLookupPaths = function (request, parent) {
	const paths = origResolve.call(this, request, parent)
	return [path.join(PROJ, 'node_modules'), ...(paths || [parent?.path])]
}

const { app, BrowserWindow } = require('electron')
const DEBUG_PORT = 9333
app.commandLine.appendSwitch('remote-debugging-port', DEBUG_PORT)
app.commandLine.appendSwitch('remote-debugging-address', `127.0.0.1:${DEBUG_PORT}`)
const url = `http://127.0.0.1:${DEBUG_PORT}`

const main = async () => {
	console.log('node', process.version)
	console.log('global fetch:', typeof fetch)
	console.log('AbortSignal.timeout:', typeof AbortSignal?.timeout)
	const deadline = Date.now() + 15000
	let last
	while (Date.now() < deadline) {
		try {
			const res = await fetch(`${url}/json/version`, { signal: AbortSignal.timeout(1500) })
			const body = await res.text()
			console.log('CDP READY status=' + res.status)
			console.log('body=' + body.slice(0, 200))
			return
		} catch (e) { last = e; await new Promise(r => setTimeout(r, 250)) }
	}
	console.log('CDP NOT UP after timeout: ' + (last?.message || last))
}

const win = new BrowserWindow({ width: 800, height: 600, show: true })
win.loadURL('about:blank')
setTimeout(main, 1500)
setTimeout(() => app.exit(0), 18000)
