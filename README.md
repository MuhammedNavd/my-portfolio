# Mohammed Naveed A — field log

A story-driven portfolio for a .NET and Azure engineer, built as a six-chapter
instrument log rather than a stack of cards. Deep-space substrate, blueprint
grid, ice cyan and acid lime signals, Chakra Petch display type and JetBrains
Mono readouts.

| Chapter | Content |
| --- | --- |
| Hero | Claim, role, orbit instrument panel |
| `00 Prologue` | Boot-log terminal, four headline numbers, short summary |
| `01 Origin` | Migration reasoning, boot sequence from BCA to senior engineer |
| `02 Service` | Current post, impact metrics, work log, operating note |
| `03 Missions` | Six selectable mission files, two side missions |
| `04 Arsenal` | Capability map grouped by purpose |
| `05 Record` | Operating rules, certifications, education, languages |
| `06 Uplink` | Availability and contact channels |

## Where things live

- **Every string and all data**: `src/content.ts`. Chapters, timeline,
  missions, skills, certifications and contact details are data; components
  only lay them out.
- **Design tokens**: `src/styles.css` (`@theme static`) — palette, type,
  keyframes, plus the `panel`, `field-grid`, `dot-field`, `scanlines`,
  `grain`, `glow-ice` and `mono-label` utilities.
- **Components**: `src/components/` — `Hud` (fixed nav with scroll spy and
  reading progress), `Hero` (orbit instrument), `Ticker`, `Chapter`,
  `Prologue`, `Origin`, `Service`, `Missions` (tabbed console), `Arsenal`,
  `Record`, `Uplink`, `Footer`, `Backdrop`, `Reveal`, `Container`.
- **Worker**: `src/worker/index.ts` serves `/api/health` and hands everything
  else to the built assets. No server-side state.

## Develop

```sh
bun install
bun run dev        # http://127.0.0.1:5360
bun run typecheck
bun run build
```

`bun run build` emits the Worker and static assets, then `scripts/postbuild.mjs`
strips source maps and hidden files so `deploy.json` can point at `dist/`.

## Resume

`public/resume/mohammed-naveed-a-resume.pdf` is printed from
`scripts/resume.html`. To regenerate it after editing the HTML:

```sh
chrome --headless=new --no-pdf-header-footer \
  --print-to-pdf=public/resume/mohammed-naveed-a-resume.pdf \
  "file:///$PWD/scripts/resume.html"
```

## Deploy

Every push to `main` builds the site on GitHub Actions and publishes
`dist/client` to GitHub Pages — https://muhammednavd.github.io/my-portfolio/
— via `.github/workflows/deploy.yml`. The workflow sets `GITHUB_PAGES=true`, so
Vite emits assets under `/my-portfolio/` instead of the domain root.
