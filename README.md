# saberPress

A cheat sheet built in bullet points.
Live site: [GitHub Pages](https://saberliou.github.io/saberPress/) · [GitLab Pages](https://saberliou.gitlab.io/saberPress/)

## Development

Requires [nvm](https://github.com/nvm-sh/nvm); the Node.js version is pinned in `.nvmrc`. `npm install` fails on Node.js or npm older than `engines` in `package.json`, and on dependency install scripts not reviewed in `allowScripts`. To review the latter:

```sh
npm install --ignore-scripts      # Install without running scripts, as `ls` and `deny` only see installed packages
npm install-scripts ls            # List the unreviewed install scripts
npm install-scripts deny <pkg>    # Or `approve <pkg>`, only if the script is really needed
npm ci                            # Reinstall with the reviewed policy
```

Commands:

```sh
nvm use               # Switch to the Node.js version in .nvmrc (run `nvm install` first if missing)
npm install
npm run docs:dev      # Start the dev server with hot reload
npm run docs:build    # Build to docs/.vitepress/dist/
npm run docs:preview  # Serve the built site locally to check the production build
npm run format        # Format with Prettier (`npm run format:check` to check only)
```

Tech stack: [VitePress](https://vitepress.dev/) with the default theme (local search enabled), formatted with Prettier.

### LLM-friendly docs

[vitepress-plugin-llms](https://github.com/okineadev/vitepress-plugin-llms) (registered in `vite.plugins` of `docs/.vitepress/config.mts`) generates the following into `docs/.vitepress/dist/` on `npm run docs:build`, following the [llms.txt](https://llmstxt.org/) convention:

| Output                 | Content                                                        | URL                                                                              |
| ---------------------- | -------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `llms.txt`             | Table of contents linking to each topic's Markdown, by sidebar | https://saberliou.github.io/saberPress/llms.txt                                  |
| `llms-full.txt`        | All topics concatenated into one Markdown file                 | https://saberliou.github.io/saberPress/llms-full.txt                             |
| `<section>/<topic>.md` | Markdown version of each topic page, next to its `.html`       | e.g. https://saberliou.github.io/saberPress/general/software-development-tips.md |

Section `index.md` pages are left out by `ignoreFiles: ['*/index.md']`, as they only list links already in `llms.txt`; pages excluded by `srcExclude` are left out as well. Add `description` in a topic's frontmatter to describe its link in `llms.txt`.

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

Pushes to the default branch (`main`) build and deploy the site to GitHub Pages and GitLab Pages respectively; both can also be triggered manually (Actions tab on GitHub, "Run pipeline" on GitLab):

```text
 push main → npm ci → format:check → vitepress build → docs/.vitepress/dist → Pages
```

| Host         | Pipeline                                           | URL                                     |
| ------------ | -------------------------------------------------- | --------------------------------------- |
| GitHub Pages | GitHub Actions (`.github/workflows/deploy.yml`)    | https://saberliou.github.io/saberPress/ |
| GitLab Pages | GitLab CI/CD (`.gitlab-ci.yml`, `build` → `pages`) | https://saberliou.gitlab.io/saberPress/ |

Both hosts serve the site under the same sub-path, so `base: '/saberPress/'` is set in `docs/.vitepress/config.mts`.

## License

[MIT](LICENSE) © saberLiou
