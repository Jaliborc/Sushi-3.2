const fs = require('fs')
const vm = require('vm')
// Read the actual project file via a relative walk from wherever we are.
// Try a few likely locations.
const candidates = [
  'C:\\Users\\Jaliborc\\Files\\Work\\Teaching\\course-notes-app\\src\\cli\\upload-grades.js',
]
let src = null
for (const c of candidates) {
  try { src = fs.readFileSync(c, 'utf8'); break } catch {}
}
if (src === null) {
  // Fallback: resolve relative to this script's cwd
  const rel = 'Work\\Teaching\\course-notes-app\\src\\cli\\upload-grades.js'
  src = fs.readFileSync(rel, 'utf8')
}
try {
  new vm.Script(src, { filename: 'upload-grades.js' })
  console.log('SYNTAX OK')
} catch (e) {
  console.log('SYNTAX ERROR:', e.message)
  process.exit(1)
}
