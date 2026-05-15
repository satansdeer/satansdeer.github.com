# maksimivanov.com Recovery Backlog

Created: 2026-05-15

## Current State

- Cloudflare Wrangler is installed and authenticated as `satansdeer@proton.me`.
- `maksimivanov.com`, `www.maksimivanov.com`, `/feed`, and recovered legacy post routes are live.
- Production traffic is currently served through the temporary Worker route bridge:
  - Worker: `maksimivanov-com-proxy`
  - Routes: `maksimivanov.com/*`, `www.maksimivanov.com/*`
- Cloudflare Pages project `maksimivanov-com` exists, but `npx wrangler pages project list --json` currently lists only `maksimivanov-com.pages.dev` as the project domain.
- Latest Pages deployment is an upload deployment tied to source `e0930ea`; the recovery commit pushed to GitHub is `2e1f471`.
- The local git worktree is clean except for the untracked `logs/` directory.

## P0 - Cut DNS Over To Direct Cloudflare Pages Custom Domains

Goal: Make Cloudflare Pages own the production hostnames directly, without relying on Worker routes.

Tasks:

- Add or confirm Pages custom domains for `maksimivanov.com` and `www.maksimivanov.com` on project `maksimivanov-com`.
- Replace any conflicting legacy DNS records in the `maksimivanov.com` zone with Pages-compatible records:
  - apex `maksimivanov.com` should point to `maksimivanov-com.pages.dev` through Cloudflare CNAME flattening or the Pages-created equivalent.
  - `www` should be a CNAME to `maksimivanov-com.pages.dev`.
- Keep Cloudflare proxying enabled unless Pages validation requires a temporary DNS-only state.
- Wait for both custom domains to become active and for SSL to be issued.
- Decide and document canonical host behavior: either apex and `www` both serve, or one redirects to the other.

Acceptance:

- `npx wrangler pages project list --json` includes `maksimivanov.com` and `www.maksimivanov.com` for `maksimivanov-com`.
- `https://maksimivanov.com/`, `https://www.maksimivanov.com/`, and `https://maksimivanov.com/posts/javascript-this/` return `200` without Worker routes.
- The selected canonical host behavior is verified with `curl -I`.

## P0 - Remove The Temporary Worker Bridge

Goal: Remove the recovery-only Worker once direct Pages DNS is active.

Tasks:

- Delete the Worker routes for `maksimivanov.com/*` and `www.maksimivanov.com/*`.
- Delete Worker service `maksimivanov-com-proxy` if it has no remaining purpose.
- Remove `workers/pages-proxy.js` and `wrangler.worker.toml` from the repo.
- Run a production smoke test after route removal.

Acceptance:

- `npx wrangler deployments status --config wrangler.worker.toml` is no longer needed for production serving.
- No Worker route exists for `maksimivanov.com/*` or `www.maksimivanov.com/*`.
- Production pages and feeds still return expected responses after the Worker is removed.

## P1 - Redeploy The Fresh GitHub Commit To Pages

Goal: Ensure the live Pages deployment corresponds to the committed and pushed recovery state.

Tasks:

- Run `npm run build`.
- Deploy a clean production build from commit `2e1f471` or a newer commit:
  - `npx wrangler pages deploy out --project-name maksimivanov-com --branch master`
- Confirm the new deployment appears in `npx wrangler pages deployment list --project-name maksimivanov-com`.
- Prefer a deployment source that matches the current Git commit instead of an older dirty upload source.

Acceptance:

- Latest Pages deployment source matches the current `master` commit.
- `out/` is regenerated from committed source.
- Production smoke tests pass.

## P1 - Make Production Deploys Repeatable

Goal: Avoid future manual recovery drift.

Tasks:

- Choose one deployment path:
  - connect Cloudflare Pages to the GitHub repository, or
  - add a GitHub Actions workflow that builds and deploys with Wrangler.
- Store Cloudflare credentials in the chosen platform's secret store.
- Document the manual fallback deploy command in the README.

Acceptance:

- Pushing to `master` can produce a fresh Pages deployment without local machine state.
- Manual deployment remains documented for emergency recovery.

## P1 - Clean Local And Repository State

Goal: Leave the repo and local workspace predictable.

Tasks:

- Decide whether `logs/` should be deleted locally or added to `.gitignore`.
- Confirm generated public assets, feeds, redirects, and sitemap are reproducible from `scripts/generate-static-assets.js`.
- Remove any recovery-only files once direct Pages DNS is active.
- Run `git status --short --branch` and keep only intentional untracked files.

Acceptance:

- `git status --short --branch` is clean, or only explicitly documented local-only files remain.
- No temporary recovery scaffolding remains after DNS cutover.

## P2 - Audit Recovered Legacy URLs

Goal: Catch any remaining dead links in recovered content.

Tasks:

- Crawl `https://maksimivanov.com/sitemap.xml`.
- Check representative legacy redirects, post pages, category pages, book pages, feed URLs, and image assets.
- Fix or redirect any `404`, unexpected `5xx`, or broken internal links.

Acceptance:

- Sitemap URLs return expected `200` responses.
- Legacy redirects return expected `301` responses.
- Feeds return valid XML or JSON content types.

## P2 - Triage Dependency Vulnerabilities

Goal: Address the GitHub security warning raised after push.

Tasks:

- Review Dependabot alerts for `satansdeer/satansdeer.github.com`.
- Separate runtime-impacting issues from build-only legacy dependency issues.
- Upgrade safe packages and document any deferred upgrades.

Acceptance:

- Critical and high alerts are either fixed or explicitly deferred with rationale.
- `npm run build` still succeeds after dependency changes.
