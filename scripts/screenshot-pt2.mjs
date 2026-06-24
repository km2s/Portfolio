import { chromium } from "playwright"
import { mkdir } from "fs/promises"

const OUT = "scripts/screenshots2"
await mkdir(OUT, { recursive: true })

const browser = await chromium.launch({ headless: true })
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } })

await page.goto("http://localhost:3002", { waitUntil: "networkidle" })
await page.waitForTimeout(1500)

// Switch to PT
const ptBtn = page.locator("button", { hasText: /PT/ }).first()
await ptBtn.click()
await page.waitForTimeout(800)

async function shot(id, name) {
  if (id) {
    await page.evaluate((sid) => {
      const el = document.getElementById(sid)
      if (el) el.scrollIntoView({ behavior: "instant", block: "start" })
    }, id)
    await page.waitForTimeout(800)
  }
  await page.screenshot({ path: `${OUT}/${name}.png`, fullPage: false })
  console.log(`✓ ${name}`)
}

// Projects — with descriptions visible
await shot("projects", "01-projects-pt")

// Scroll down to show more project content
await page.evaluate(() => {
  const el = document.getElementById("projects")
  if (el) el.scrollIntoView({ behavior: "instant" })
})
await page.evaluate(() => window.scrollBy(0, 300))
await page.waitForTimeout(600)
await page.screenshot({ path: `${OUT}/02-projects-card.png` })
console.log("✓ 02-projects-card")

// Architecture
await shot("architecture", "03-architecture-pt")

// Skills — check yr/yrs
await shot("skills", "04-skills-pt")

// Recruiter panel — projects section
await page.evaluate(() => window.scrollTo(0, 0))
await page.waitForTimeout(400)
const recruiterBtn = page.locator("button").filter({ hasText: /Recrutador|Recruiter/i }).last()
await recruiterBtn.click()
await page.waitForTimeout(800)
// Scroll panel to projects
await page.evaluate(() => {
  const panel = document.querySelector('[role="dialog"]')
  if (panel) panel.scrollTop = 600
})
await page.waitForTimeout(400)
await page.screenshot({ path: `${OUT}/05-recruiter-projects.png` })
console.log("✓ 05-recruiter-projects")

await browser.close()
console.log("\nDone →", OUT)
