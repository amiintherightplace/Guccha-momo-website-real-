# The Guccha Momo & Cafe — static website
**Run:** open `index.html` (or `python3 -m http.server`). No backend needed.
**Edit details/menu/WhatsApp:** top of `script.js` (`CONFIG`). WhatsApp number = country code + number, no `+` (e.g. `9779840700700`). Replace the PLACEHOLDER email and Facebook URL.
**Images:** swap files in `assets/` (keep names) or change filenames in `CONFIG.menu` / the `photos` array.
**Deploy:** GitHub Pages — push to a repo, Settings → Pages → branch `main` / root. Cloudflare Pages — connect repo, no build command, output dir `/`. Or drag the folder onto Netlify.
**Before launch:** confirm menu prices, opening hours, and that the number has WhatsApp.
