# The Patch — launch guide

A gaming news / reviews / opinions site, built to deploy on Netlify and to be written for entirely from your phone or laptop browser — no code required once it's set up.

- **Framework:** Eleventy (11ty) — turns simple text files into a fast static website
- **Writing tool:** Decap CMS — a visual "admin panel" at `yoursite.com/admin` where you fill in a form and hit Publish
- **Hosting:** Netlify (free tier is enough to start)
- **Ad-ready:** AdSense slots and `ads.txt` are wired in, just waiting on your publisher ID

---

## Part 1 — One-time setup (30–45 minutes)

### 1. Put this project on GitHub

Decap CMS needs a real Git repository to save your articles to.

1. Create a free account at [github.com](https://github.com) if you don't have one.
2. Create a new **empty** repository (e.g. `the-patch`), no README/license — you already have files.
3. Upload this whole project folder to that repo. Easiest way if you're not comfortable with the command line: on your new repo's page, click **"uploading an existing file"** and drag in everything, or use [GitHub Desktop](https://desktop.github.com) (drag the folder in, click "Publish repository").

### 2. Connect the repo to Netlify

1. Sign up / log in at [netlify.com](https://netlify.com) (free).
2. **Add new site → Import an existing project → GitHub**, and pick your `the-patch` repo.
3. Build settings should auto-detect from `netlify.toml`:
   - Build command: `npm run build`
   - Publish directory: `_site`
4. Click **Deploy**. First build takes a minute or two. You'll get a URL like `random-name-123.netlify.app` — you can rename it or add a real domain later in **Site settings → Domain management**.

### 3. Turn on the admin panel (Netlify Identity + Git Gateway)

This is what lets you log into `/admin` and publish articles without touching GitHub directly.

1. In your Netlify site dashboard: **Site configuration → Identity → Enable Identity**.
2. Under **Identity → Registration**, set it to **Invite only** (so random people can't sign up).
3. Under **Identity → Services → Git Gateway**, click **Enable Git Gateway**.
4. Go to the **Identity** tab and click **Invite users** — invite your own email address.
5. Check your email, click the invite link, set a password. You're now a registered site user.

### 4. Update your real details

Before you go live, open these files (you can do this on GitHub.com directly — click the file, then the pencil/edit icon — no local setup needed):

- `src/_data/site.json` — set your real domain in `"url"`, your social links, and your AdSense publisher ID once you have one. (You can also edit this later from `/admin` under **Site Settings**.)
- `src/robots.txt` and `src/sitemap.njk` — the `https://thepatch.example.com` placeholder should match whatever `site.json`'s `"url"` is.
- `src/ads.txt` — replace `pub-0000000000000000` with your real AdSense publisher ID once approved.
- `src/contact.md` and `src/privacy-policy.md` — swap in your real email address.

Commit those changes (or edit via `/admin → Site Settings / Pages`) and Netlify will automatically rebuild the live site every time.

**You're live.** From here on, everything below is your day-to-day workflow — no more Git/Netlify setup needed.

---

## Part 2 — Writing an article (takes 2 minutes)

1. Go to `yoursite.com/admin` and log in.
2. Click **Articles → New Article**.
3. Fill in:
   - **Title** — the headline
   - **Subhead (dek)** — one sentence, shows on the homepage cards
   - **Category** — News, Reviews, or Opinions
   - **Publish Date**
   - **Cover Image** — click to upload one from your computer
   - For **Reviews only**: fill in **Review Score**, **Pros**, and **Cons** — these auto-generate the scorecard at the bottom of the article
   - **Article Body** — write your piece using the toolbar (bold, headers, links, images) or plain Markdown
4. Click **Publish now** (top right).

That's it. Netlify rebuilds the site in the background (takes ~30–60 seconds) and your article is live. You can do this entirely from your phone's browser between meetings at your day job.

**Tip:** only mark one article "Feature on homepage?" at a time — that's the big story shown at the top of the homepage.

---

## Part 3 — Getting AdSense-ready

1. Apply at [google.com/adsense](https://www.google.com/adsense/) once you have real content live (Google generally wants an established site with real articles and working nav/legal pages — you already have those).
2. Once approved, Google gives you a **publisher ID** (`ca-pub-...`) and ad **slot IDs**.
3. In `/admin → Site Settings`, paste your publisher ID into **AdSense Publisher ID**.
4. In `src/ads.txt`, replace the placeholder publisher ID with the real one.
5. In `src/_includes/layouts/base.njk`, delete the `<!--` and `-->` lines around the AdSense `<script>` tag near the top of `<head>` to turn the loader on.
6. In `src/_includes/partials/ad-slot.njk`, replace the placeholder `<div class="ad-slot">` contents with the real `<ins class="adsbygoogle">` snippet AdSense gives you (a commented-out example is already in that file).

Ad slots already sit in sensible spots: one inside every article body, one in the sidebar, and one between the News and Reviews sections on the homepage.

---

## Part 4 — Socials

`src/_data/site.json` (or `/admin → Site Settings`) holds your TikTok, YouTube, and X links — they show up in the footer and the "Follow" band above it automatically once you fill them in.

Suggested loop for daily posting around a 9–5: write the article on your lunch break or evening via `/admin`, clip the most quotable line or the review score for a TikTok/X post, link back to the full article for YouTube description / X replies.

---

## Customizing the look

- **Colors, spacing, fonts:** all in `src/styles/main.css` — it's organized top to bottom (header, hero, cards, article page, footer) with a token list at the very top (`:root { --ink: ...; --amber: ...; }`) if you just want to swap the accent color.
- **Site name/tagline:** `src/_data/site.json`.
- **Homepage layout:** `src/index.njk`.
- **Logo:** currently text-based ("THE PATCH."). Swap for an image by editing `src/_includes/partials/header.njk`.

---

## Previewing changes locally (optional)

You don't need this to run the site day-to-day — Netlify builds it for you. But if you want to preview edits before publishing:

```bash
npm install
npm start
```

Then open `http://localhost:8080`. Requires [Node.js](https://nodejs.org) installed on your computer.

---

## File map

```
src/
  _data/site.json          → global settings (title, socials, AdSense IDs)
  _includes/layouts/        → page templates (base, post, page)
  _includes/partials/       → header, footer, ad slots, article cards
  posts/                    → every article lives here as one .md file
  admin/                    → the /admin CMS panel + its config.yml
  styles/main.css           → all site styling
  index.njk                 → homepage
  news.njk / reviews.njk / opinions.njk  → category listing pages
  about.md / contact.md / privacy-policy.md → static pages
  ads.txt, robots.txt, sitemap.njk, feed.njk → SEO/ads plumbing
netlify.toml                → tells Netlify how to build the site
```

---

## Notes

- The included privacy policy is a starting template, not legal advice — review it (or use a generator like Termly/iubenda) before you're getting real traffic, especially for EU/UK visitors.
- Three sample articles (one per category) are included so the site isn't empty on first deploy — delete or overwrite them from `/admin` once you have real content.
