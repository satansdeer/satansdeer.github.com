# maksimivanov.com

Static recovery of `maksimivanov.com`, built with Next.js static export and deployed to Cloudflare Pages project `maksimivanov-com`.

## Local Development

```bash
npm install --no-audit --no-fund
npm run dev
```

The local development server runs at `http://localhost:3000`.

## Static Build

```bash
npm run build
```

The `prebuild` script regenerates static assets, then `next build && next export` writes the Cloudflare Pages artifact to `out/`.

## Production Deploy

Production deploys are handled by GitHub Actions in `.github/workflows/deploy-pages.yml`.

The workflow runs on every push to `master` and can also be started manually from the GitHub Actions UI. It installs dependencies, runs `npm run build`, and deploys `out/` with Wrangler:

```bash
npx wrangler pages deploy out \
  --project-name maksimivanov-com \
  --branch master \
  --commit-hash "$GITHUB_SHA" \
  --commit-message "$COMMIT_MESSAGE" \
  --commit-dirty=false
```

Required GitHub Actions secrets:

- `CLOUDFLARE_ACCOUNT_ID`: `ee13217ce6d0d1a961c275db7e351868`
- `CLOUDFLARE_API_TOKEN`: Cloudflare API token with the Cloudflare Pages permission set to Edit, also shown as `Pages Write` in the Cloudflare API permissions, for the account that owns `maksimivanov-com`.

Install the secrets with GitHub CLI after authenticating as a repository admin:

```bash
gh secret set CLOUDFLARE_ACCOUNT_ID --body "ee13217ce6d0d1a961c275db7e351868"
gh secret set CLOUDFLARE_API_TOKEN
```

Do not commit Cloudflare tokens or local `.env*.local` files. The currently deployed custom domains are `maksimivanov.com` and `www.maksimivanov.com`.

Until both GitHub Actions secrets exist, the workflow still builds the static export but skips the Cloudflare deploy step with a warning. After the secrets are installed, the next push to `master` or manual workflow dispatch deploys to Cloudflare Pages.

## Manual Recovery Deploy

Use this fallback when GitHub Actions is unavailable. It assumes Wrangler is already logged in with Pages deploy access, or that the shell environment contains a Pages-capable `CLOUDFLARE_API_TOKEN`.

```bash
npm run build
touch /tmp/wrangler-empty.env
npx wrangler pages deploy out \
  --project-name maksimivanov-com \
  --branch master \
  --commit-hash "$(git rev-parse HEAD)" \
  --commit-message "$(git log -1 --pretty=%B | head -n 1)" \
  --commit-dirty=false \
  --env-file /tmp/wrangler-empty.env
```

The explicit empty Wrangler env file prevents a local DNS-only `.env.local` token from overriding Wrangler OAuth during a recovery deploy.
