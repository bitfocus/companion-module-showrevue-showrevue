// The module is plain JavaScript, so there is nothing to compile. `yarn build` and `yarn lint`
// parse every file in src/ so a syntax error fails CI before packaging.
import { readdirSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import { join } from 'node:path'

const dir = new URL('../src/', import.meta.url).pathname
let failed = 0
for (const f of readdirSync(dir).filter((n) => n.endsWith('.js'))) {
	const r = spawnSync(process.execPath, ['--check', join(dir, f)], { encoding: 'utf8' })
	if (r.status !== 0) {
		failed++
		console.error(`src/${f}\n${r.stderr}`)
	}
}
if (failed) process.exit(1)
console.log('src/*.js parse cleanly')
