import { chromium } from "playwright"
import { mkdir } from "fs/promises"

const OUT = "scripts/screenshots"
await mkdir(OUT, { recursive: true })

const browser = await chromium.launch({ headless: true })
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } })

await page.goto("http://localhost:3002", { waitUntil: "networkidle" })
await page.waitForTimeout(1200)

// Switch to PT
const ptBtn = page.locator("button", { hasText: /PT/ }).first()
await ptBtn.click()
await page.waitForTimeout(600)

// Helper: scroll to section, wait, screenshot
async function shot(id, name) {
  if (id) {
    await page.evaluate((sid) => {
      const el = document.getElementById(sid)
      if (el) el.scrollIntoView({ behavior: "instant", block: "start" })
    }, id)
    await page.waitForTimeout(700)
  }
  await page.screenshot({ path: `${OUT}/${name}.png`, fullPage: false })
  console.log(`✓ ${name}`)
}

await shot(null, "01-hero")

await page.evaluate(() => window.scrollBy(0, 800))
await page.waitForTimeout(500)
await page.screenshot({ path: `${OUT}/02-hero-bottom.png` })
console.log("✓ 02-hero-bottom")

await shot("about", "03-about")
await shot("skills", "04-skills")
await shot("timeline", "05-timeline")

// scroll down in timeline
await page.evaluate(() => {
  const el = document.getElementById("timeline")
  if (el) el.scrollIntoView({ behavior: "instant" })
})
await page.evaluate(() => window.scrollBy(0, 500))
await page.waitForTimeout(500)
await page.screenshot({ path: `${OUT}/06-timeline-bottom.png` })
console.log("✓ 06-timeline-bottom")

await shot("ai-assistant", "07-ai-assistant")
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
await page.waitForTimeout(500)
await page.screenshot({ path: `${OUT}/08-footer.png` })
console.log("✓ 08-footer")

// Open Recruiter Mode panel
await page.evaluate(() => window.scrollTo(0, 0))
await page.waitForTimeout(400)
const recruiterBtn = page.locator("button").filter({ hasText: /Mode|Modo/i }).last()
await recruiterBtn.click()
await page.waitForTimeout(800)
await page.screenshot({ path: `${OUT}/09-recruiter-top.png` })
console.log("✓ 09-recruiter-top")

// Scroll inside the recruiter panel
await page.evaluate(() => {
  const panel = document.querySelector('[role="dialog"]')
  if (panel) panel.scrollTop = 400
})
await page.waitForTimeout(400)
await page.screenshot({ path: `${OUT}/10-recruiter-mid.png` })
console.log("✓ 10-recruiter-mid")

await page.evaluate(() => {
  const panel = document.querySelector('[role="dialog"]')
  if (panel) panel.scrollTop = 9999
})
await page.waitForTimeout(400)
await page.screenshot({ path: `${OUT}/11-recruiter-bottom.png` })
console.log("✓ 11-recruiter-bottom")

// Projects section in PT
const closeBtn = page.locator('[aria-label="Close"]')
await closeBtn.click()
await page.waitForTimeout(400)
await shot("projects", "12-projects")

// Architecture in PT
await shot("architecture", "13-architecture")

await browser.close()
console.log("\nAll screenshots saved to", OUT)
