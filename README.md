# saberPress

A cheat sheet built in bullet points.
Live site: [GitHub Pages](https://saberliou.github.io/saberPress/)

## Development

Requires [nvm](https://github.com/nvm-sh/nvm); the Node.js version is pinned in `.nvmrc`. `npm install` (via `engine-strict` in `.npmrc`) fails on an older Node.js.

```sh
nvm use               # Switch to the Node.js version in .nvmrc (run `nvm install` first if missing)
npm install
npm run docs:dev      # Start the dev server with hot reload
npm run docs:build    # Build to docs/.vitepress/dist/
npm run docs:preview  # Serve the built site locally to check the production build
npm run format        # Format with Prettier (`npm run format:check` to check only)
```

Tech stack: [VitePress](https://vitepress.dev/) with the default theme (local search enabled), formatted with Prettier.

## Structure

```
docs/
├─ .vitepress/
│  └─ config.mts         # Site config: title, base path, sidebar, social links
├─ index.md              # Home page, with a link to each section
├─ <section>/            # One folder per section (e.g. general/)
│  ├─ index.md           #   List of the section's topics
│  └─ <topic>.md         #   One page per topic
└─ public/               # Static assets served as-is, grouped by section (public/<section>/)
```

- **New topic:** create `docs/<section>/<topic>.md`, list it in that section's `index.md`, and add it to the section's `items` in `sidebar` (`docs/.vitepress/config.mts`).
- **New section:** create `docs/<section>/index.md`, add a sidebar group with `base: '/<section>'`, and add a link to it in `actions` on the home page (`docs/index.md`).

## Deployment

Pushes to `main` build and deploy the site to GitHub Pages via GitHub Actions (`.github/workflows/deploy.yml`); it can also be triggered manually from the Actions tab:

```text
 push main → npm ci → format:check → vitepress build → upload docs/.vitepress/dist → GitHub Pages
```

| Host         | Pipeline                                        | URL                                     |
| ------------ | ----------------------------------------------- | --------------------------------------- |
| GitHub Pages | GitHub Actions (`.github/workflows/deploy.yml`) | https://saberliou.github.io/saberPress/ |

The site is served under a sub-path, so `base: '/saberPress/'` is set in `docs/.vitepress/config.mts`.

## License

[MIT](LICENSE) © saberLiou
