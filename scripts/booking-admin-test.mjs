import { chromium } from "playwright";

const base = "http://127.0.0.1:8080";
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();

await page.goto(base + "/contact", { waitUntil: "networkidle" });
await page.waitForSelector('[data-testid="booking-widget"]', { timeout: 15000 });
await page.fill('input[name="firstName"]', "Alex");
await page.fill('input[name="lastName"]', "Rivera");
await page.fill('input[name="email"]', "alex.rivera@example.com");
await page.fill('input[name="phone"]', "8645550199");
await page.selectOption('select[name="projectType"]', { index: 1 });
await page.fill('textarea[name="message"]', "Primary bath remodel test");
await page.click('button[type="submit"]');
await page.waitForSelector('[data-testid="booking-success"]', { timeout: 20000 });
const conf = await page.locator('[data-testid="booking-success"]').innerText();
console.log("BOOKING_OK", conf.slice(0, 240).replace(/\n/g, " | "));

await page.goto(base + "/admin", { waitUntil: "networkidle" });
await page.fill('input[type="password"]', "levelup-admin");
await page.click('button[type="submit"]');
await page.waitForTimeout(2000);
const body = await page.locator("body").innerText();
const hasLead = body.includes("Alex") || body.includes("Rivera");
console.log("ADMIN_OK", hasLead);
console.log("ADMIN_SNIP", body.slice(0, 500).replace(/\n/g, " | "));

await browser.close();
