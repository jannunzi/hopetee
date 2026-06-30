# Set up automatic publishing for hopetee.org

One-time setup, all in your web browser — no terminal, no commands.
When you're done, updating the live site is as easy as uploading a file on a webpage.

Total time: about 15 minutes.

---

## Part 1 — Put your site on GitHub (free)

GitHub is just online storage for your website files.

1. Go to https://github.com and click **Sign up**. Create a free account
   (skip if you already have one) and verify your email.

2. Once logged in, click the **+** in the top-right corner → **New repository**.

3. Fill in:
   - **Repository name:** `hopetee`
   - Leave it **Public** (this is fine — only the website files, nothing secret).
   - Do **not** check "Add a README."
   - Click **Create repository**.

4. On the next page you'll see a mostly empty repo. Click the link
   **"uploading an existing file"** (it's in the small text in the middle),
   or go to **Add file → Upload files**.

5. Open your `hopetee/site` folder on your computer. Select **everything inside it**:
   - `index.html`
   - `collection.html`
   - `i18n.js`
   - the `assets` folder
   - (`DEPLOY.md` and the other guides are optional — fine to include)

   Drag all of those into the GitHub upload box. **Important:** drag the *contents*
   of the `site` folder, not the `site` folder itself — `index.html` must end up at
   the top level of the repo.

6. Scroll down and click **Commit changes**. Your files are now on GitHub. ✅

---

## Part 2 — Connect Vercel to GitHub

This tells your existing site to update itself whenever GitHub changes.

1. Go to https://vercel.com and open your existing **hopetee** project
   (the one that already serves hopetee.org).

2. Click **Settings** (top menu) → **Git** (left menu).

3. Click **Connect Git Repository** → choose **GitHub**.
   - If asked, click **Install** / **Authorize Vercel** and give it access to your
     GitHub account (you can limit it to just the `hopetee` repo).

4. Select your **hopetee** repository from the list and confirm.

5. Vercel will now pull the files from GitHub and redeploy. Wait ~30 seconds, then
   open https://hopetee.org — it should show the latest version (with the working
   mailing-list form).

> If Vercel won't let you connect Git to this project, do this instead:
> **Add New → Project → Import** the `hopetee` repo (Framework preset: **Other**),
> deploy it, then go to **Settings → Domains**, remove `hopetee.org` from the old
> project and add it to this new one. Same result.

---

## From now on — how to make a change

You never touch Vercel again. To update the live site:

1. Go to your `hopetee` repo on GitHub.
2. Click the file you want to change (e.g. `index.html`) → click the **pencil icon** to edit,
   **or** use **Add file → Upload files** to replace a file with a new version from your computer.
3. Click **Commit changes**.
4. Vercel sees the change and republishes hopetee.org automatically in ~30 seconds.

That's it. Edit on GitHub → site updates itself.

---

## Tip: let me make the edits for you

When you want a change (new copy, swap a tee image, add a donation button, etc.),
just ask me. I'll update the files in your `hopetee/site` folder, and you upload the
changed file to GitHub using step 2 above. Or ask me to walk you through it in your browser.
