# Project structure

Read this before making changes. It explains how the pieces fit together so
you don't have to re-derive it from scratch.

## What this app is

A no-code website builder built on **[Puck](https://puckeditor.com/)**
(`@measured/puck`), a visual page editor for React. A user picks a business
**template** (salon, bakery, education, gym, ...), Puck lets them drag/edit
pre-built **blocks** (Hero, Testimonials, Pricing, ...) inside those
templates, and the result — a JSON tree called **Puck data** — is stored in
Supabase and rendered back out as a real page at a public URL.

Stack: Next.js 16 (App Router, Turbopack), React, TypeScript, Tailwind,
Supabase (Postgres + Realtime), Groq (AI content), JSZip (static export).

## The core concept: template configs

Everything revolves around a Puck `Config` object per template, defined in
`src/configs/*.config.tsx`. A config is a map of block-type-name →
`{ fields, defaultProps, render }`:

```
export const educationConfig: Config<Props> = {
  components: {
    EducationHero: {
      fields: { headline: { type: "text" }, ... },
      defaultProps: { headline: "...", ... },
      render: ({ puck, ...props }) => <EducationHero {...props} />,
    },
    CourseList: { ... },
    ...
  },
};
```

- `render` wires the Puck block name to the actual presentational component
  in `src/blocks/`.
- `fields` describes the editing UI Puck generates in the sidebar.
- `defaultProps` seeds a freshly-dropped block before the user edits it.

All configs are registered in **`src/configs/index.ts`**:

```
templateConfigs = { salon, bakery, plumber, education, gym, lawyer,
                     restaurant, portfolio, clothing, ayurvedic, craft }
```

`getTemplateConfig(templateId, puckData)` is the single lookup function
every page uses to go from a site's stored `template_id` to its `Config`
object. It also has a fallback: if `template_id` is missing/stale (legacy
data), it infers the template by checking which config's `components` keys
cover every block `type` found in the site's saved content, defaulting to
`salon` if nothing matches.

`src/configs/globalBlocks.tsx` holds two blocks (`MegaFooter`,
`FloatingWhatsApp`) shared by several templates (ayurvedic, restaurant,
craft, portfolio, clothing, lawyer, plumber) that spread `globalBlocks` into
their own `components` map. Other templates (salon, bakery, gym, education)
define their own template-specific footer/CTA blocks instead.

## ⚠️ Gotcha: never put `"use client"` in a `*.config.tsx` file

`src/configs/*.config.tsx` files are imported directly by **Server
Components** (`preview/[siteId]/page.tsx`, `[siteId]/page.tsx`). If a config
file has a `"use client"` directive, Next.js turns its exports into opaque
client-reference stubs when a Server Component imports them — the config
object comes through with `components` as `undefined`, and Puck's `Render`
crashes with `Cannot read properties of undefined (reading '<BlockName>')`.

The block components themselves (`src/blocks/*.tsx`) should have
`"use client"` if they use hooks/interactivity — that's correct and
expected. The config file that merely *references* them should not.

## Rendering contexts — the same config/data pair, rendered 3 different ways

| Route | File | Who sees it | Notes |
|---|---|---|---|
| `/editor/[siteId]` | `src/app/editor/[siteId]/EditorClient.tsx` | Site owner (and co-editors) | Interactive `<Puck>` component (client-side). Autosaves to `/api/save-site` on a debounce. Supports realtime co-editing, version history, SEO lint, onboarding tour. |
| `/preview/[siteId]` | `src/app/preview/[siteId]/page.tsx` | Owner via a private, unlisted link | Server Component. Read-only `<Render>`. Exists as soon as a draft autosaves, regardless of publish state. `noindex` always. |
| `/[siteId]` | `src/app/[siteId]/page.tsx` | The public | Server Component. Read-only `<Render>`. 404s unless `is_published` is `true` — this is the only page gated on publish state. Also renders `<ExportButton>` and `<RemixButton>`. |

`<Render>` (from `@measured/puck`) is the read-only counterpart to the
interactive `<Puck>` editor — same config, no editing chrome.

**Known limitation:** unlike the interactive editor (which merges
`defaultProps` and runs each block's `resolveData` automatically), `<Render>`
does neither. `EditorClient.tsx` works around this for its own use with a
local `withDefaultProps()` helper before ever saving data, but the
preview/public pages call `<Render>` directly on raw stored data. A block
whose correctness depends on `resolveData` (e.g. `ProductMenu`'s
Puck-internal `{ value }`-wrapped category strings) can behave differently
in the editor vs. in preview/public if the saved data never went through
that merge.

## Data model (Supabase)

**`sites`** (no SQL file checked in — created directly in the Supabase
dashboard):
- `site_name` (text, unique) — the human-typed slug, sanitized to
  `[a-z0-9-]` server-side in `/api/save-site`. Doubles as the editor,
  preview, and public URL segment.
- `template_id` (text) — key into `templateConfigs`.
- `puck_data` (jsonb) — the Puck `Data` tree: `{ root, zones, content: [{ type, props }] }`.
- `is_published` (boolean) — gates the public `/[siteId]` route only.

**`site_versions`** (`sql/site_versions.sql`) — full snapshot history:
- `site_name` (FK → `sites.site_name`, cascade delete), `template_id`,
  `puck_data` (jsonb), `created_at`.
- A new row is inserted on every save in `/api/save-site` *unless* it's
  byte-identical to the last snapshot (autosave fires on every debounced
  keystroke).

## API routes (`src/app/api/*/route.ts`)

| Route | Purpose |
|---|---|
| `save-site` | Upsert `sites` by `site_name`. Draft autosaves never flip a published site back to private — only an explicit `publish: true` does. Also writes a `site_versions` snapshot. |
| `site-versions` | List lightweight version history (`?siteId=`), or fetch one full snapshot (`?siteId=&versionId=`) for the editor's restore flow. |
| `remix-site` | Clones a **published** site's `puck_data` into a new row under a generated name, as a new private draft. Pure DB copy, no AI. |
| `upload-image` | Backs `ImageUploadField`, the shared `"custom"` Puck field used across templates for image props. |
| `generate-content` | Groq-backed AI content generation. **Currently orphaned** — not called from any component as of this writing; check before assuming it's wired up. |
| `get-site` | Reads from a local `database.json` file, not Supabase. **Legacy/unused** — no current page calls it. Don't treat `database.json` as the source of truth; Supabase is. |

## Directory map

```
src/
  app/
    page.tsx                    Landing page — template gallery, "create site" flow
    editor/[siteId]/            Interactive Puck editor (client)
    preview/[siteId]/           Read-only private preview (server)
    [siteId]/                   Read-only public site (server, publish-gated)
    api/                        Route handlers, see table above
  configs/
    <template>.config.tsx       One Config<Props> per template — block registry for that template
    globalBlocks.tsx            Shared MegaFooter/FloatingWhatsApp blocks, opt-in per template
    index.ts                    templateConfigs map + getTemplateConfig() lookup/fallback
  blocks/                       One presentational component per Puck block type,
                                 e.g. EducationHero.tsx, CourseList.tsx. Loosely prefixed
                                 by template (Bakery*, Clothing*, Craft*...) where a block
                                 isn't shared across templates.
  components/                   Editor chrome & cross-cutting UI: PublishModal, ExportButton,
                                 RemixButton, VersionHistoryPanel, SeoLintPanel, PresencePill,
                                 SpotlightTour, EditorOnboarding, ImageUploadField, PuckRenderer
  hooks/useCoEditing.ts          Supabase Realtime channel per siteId: presence (who's online)
                                 + broadcast (relay Puck data edits between open tabs)
  lib/
    aiContentMerge.ts           Merges AI-generated content patches into salon Puck data
    siteLinter.ts               lintPuckData()/applyAllLintFixes() — basic SEO/content checks
                                 shown in the editor's SeoLintPanel
  utils/supabase/
    server.ts                  Server-side Supabase client (async, cookie-based, SSR)
    client.ts                  Browser-side Supabase client
sql/site_versions.sql          Schema + RLS policies for the version-history table
database.json                 Legacy local mock store — only api/get-site reads it; unused
                                by the current app flow (Supabase is the real store)
```

## Adding a new template — checklist

1. Add presentational block components in `src/blocks/` (mark them
   `"use client"` only if they need it — most do, for animation/interaction).
2. Create `src/configs/<name>.config.tsx` — **no `"use client"` directive**.
   Export `<name>Config: Config<Props>` and `defaultData` (the starter
   `content` array new sites get).
3. Register both in `src/configs/index.ts`'s `templateConfigs` and
   `templateData` maps, keyed by the same lowercase id used everywhere else.
4. Add an entry to the `templates` array in `src/app/page.tsx` (gallery
   card: id, name, description, tag, sections list).
5. Sanity-check all three render paths: editor (`/editor/<id>?template=<name>`),
   preview (`/preview/<siteId>`), and public (`/<siteId>` after publishing).
