// Captures static screenshots of the live project sites for the Projects
// section "live preview" (their servers send X-Frame-Options, so they can't be
// embedded in an <iframe> — an image is the reliable way to show them).
//
// Usage: node scripts/screenshot-projects.mjs
import { chromium } from "playwright"
import { fileURLToPath } from "url"
import path from "path"
import { mkdirSync } from "fs"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outDir = path.join(__dirname, "..", "public", "projects")
mkdirSync(outDir, { recursive: true })

// Keys must match the project `id` in src/data/projects.ts, since the UI
// resolves the image as /projects/<id>.png.
const targets = [
  { id: "saga-rpg", url: "https://saga-ruddy.vercel.app/characters" },
  { id: "beauty-store", url: "https://beauty-store-rose.vercel.app/" },
]

const browser = await chromium.launch()
const context = await browser.newContext({
  viewport: { width: 1280, height: 800 },
  deviceScaleFactor: 1.5,
})

let failures = 0
for (const t of targets) {
  const page = await context.newPage()
  try {
    await page.goto(t.url, { waitUntil: "load", timeout: 45000 })
    // Let fonts/images/animations settle before capturing.
    await page.waitForTimeout(3500)
    const out = path.join(outDir, `${t.id}.png`)
    await page.screenshot({ path: out })
    console.log("saved", out)
  } catch (e) {
    failures++
    console.error("FAILED", t.id, "-", e.message)
  } finally {
    await page.close()
  }
}

await browser.close()
process.exit(failures ? 1 : 0)
