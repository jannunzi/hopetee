# HopeTee — Deploy & Domain Guide

This is a plain static website (HTML, CSS, JS, images). No build step, no server needed.

```
site/
├── index.html        Landing page (bilingual EN/ES, sample tees)
├── collection.html   Collection detail page (?c=families | children | heroes)
├── i18n.js           EN/ES dictionary + language switching
├── assets/           Logo and shirt images
└── DEPLOY.md         This file
```

You can double-click `index.html` to preview it locally in any browser.

---

## Your question: Vercel first, then point GoDaddy?

**Yes — that's exactly the right order.** Host the site on Vercel, then point your
GoDaddy `hopetee.org` domain at Vercel using DNS records. You do **not** transfer the
domain or change registrar; GoDaddy stays your registrar, Vercel just serves the site.

Short version: Vercel hosts → GoDaddy DNS points to Vercel → Vercel issues the free
HTTPS certificate automatically.

---

## Step 1 — Put the site on Vercel

Easiest path (no Git required):

1. Create a free account at https://vercel.com
2. Click **Add New… → Project → Deploy** and drag-and-drop the `site` folder
   (or use **Vercel CLI**: `npm i -g vercel`, then run `vercel` inside the `site` folder).
3. Vercel gives you a live URL like `hopetee.vercel.app`. Open it and confirm everything works.

(If you prefer Git: push `site/` to a GitHub repo and "Import" it in Vercel. Future
changes then deploy automatically on every push.)

---

## Step 2 — Add your domain in Vercel

1. In your Vercel project: **Settings → Domains**.
2. Add `hopetee.org` and also add `www.hopetee.org`.
3. Vercel will show you the exact DNS records to create. They'll be one of these two setups:

   **Option A — recommended (use Vercel's nameservers):**
   Vercel gives you two nameservers (e.g. `ns1.vercel-dns.com`, `ns2.vercel-dns.com`).
   This hands all DNS to Vercel and is the most reliable.

   **Option B — keep GoDaddy DNS, just add records:**
   - `A` record: host `@` → value `76.76.21.21`
   - `CNAME` record: host `www` → value `cname.vercel-dns.com`

   Use whichever Vercel shows in your dashboard — those values are authoritative.

---

## Step 3 — Set the DNS at GoDaddy

1. Log in to GoDaddy → **My Products → Domains → hopetee.org → DNS / Manage DNS**.

   **If you chose Option A (nameservers):**
   - Find **Nameservers** → **Change** → **Enter my own nameservers** →
     paste the two Vercel nameservers → Save.

   **If you chose Option B (records):**
   - Delete GoDaddy's default parked `A` record on `@`.
   - Add the `A` record (`@` → `76.76.21.21`).
   - Add the `CNAME` (`www` → `cname.vercel-dns.com`).

2. Save. DNS changes usually take 10–60 minutes (can be up to a few hours).

---

## Step 4 — Confirm

- Back in Vercel → **Settings → Domains**, the domain shows **Valid Configuration**.
- Vercel auto-issues a free SSL certificate, so `https://hopetee.org` works with the padlock.
- Set `hopetee.org` as the **primary** domain and let `www` redirect to it (Vercel does this for you).

That's it — `https://hopetee.org` is live.

---

## Updating the site later

- **Drag-and-drop deploy:** re-drag the `site` folder into the project to publish a new version.
- **Git deploy:** push to your repo; Vercel redeploys automatically.

## Things you'll likely want next

- **Email signup:** the "Get Involved" form currently just shows a thank-you. To collect
  real emails, wire it to a form service (Formspree, Tally, or a Google Form) — a one-line
  change to the form's `action`.
- **Donations:** the "Make a donation" link is a placeholder. Drop in a Stripe Payment Link,
  PayPal, or your fiscal sponsor's donation URL when ready.
- **Real tee artwork:** the sample tees currently show the HopeTee logo. Swap in artist
  designs as they come in by replacing the images in `assets/`.
