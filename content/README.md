# Website copy (edit here)

All marketing text for the site lives in the JSON files in this folder. After you save changes and they are merged to the main branch, the live site updates automatically (Vercel).

## How to edit on GitHub

1. Open the repo on GitHub and go to the `content` folder.
2. Click the file you want (for example `home.json` for the homepage).
3. Click the **pencil** icon (Edit).
4. Change only the text **inside the quotes**. Do not remove commas between lines or change `"key":` names unless a developer asked you to.
5. If your text needs a double-quote character (`"`), avoid it or ask for help; otherwise the file may break.
6. Click **Commit changes** and describe what you updated.

## Which file is which

| File | What it controls |
|------|------------------|
| `site.json` | Site-wide SEO defaults, header menu, footer, default banner at the bottom of many pages |
| `home.json` | Homepage |
| `about.json` | About page |
| `contact.json` | Contact page and contact form labels/messages |
| `process.json` | How It Works page (including the expandable contested scenarios) |
| `services-landing.json` | Services overview page |
| `services.json` | Each practice area page (uncontested, contested, child support, maintenance) |
| `order.json` | Order / start case page |
| `privacy.json` | Privacy policy |

## `site.json` and links

`headerNav`, `footer.services`, and `footer.firmLinks` include both `"href"` (the URL path) and `"label"` (the words shown). **Only change `label` unless you know the URL should change.** Wrong `href` values can create broken links.
