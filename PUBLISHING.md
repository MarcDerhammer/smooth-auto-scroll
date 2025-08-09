# Publishing Guide

This guide walks you through publishing `smooth-auto-scroll` to npm via **GitHub Actions only**.

## 🚀 Tag-Based Release Process

This package uses **automated publishing** triggered by git tags. Manual npm publishing is disabled for security and consistency.

## Prerequisites

### 1. GitHub Repository Setup
**Required GitHub Secret:**
- Add `NPM_TOKEN` to GitHub repository secrets
- Go to Settings → Secrets and variables → Actions
- Add new repository secret: `NPM_TOKEN`

To get your npm token:
```bash
npm login  # Login to npm
npm token create --read-only=false  # Create automation token
```

### 2. Check Package Name Availability
```bash
npm info smooth-auto-scroll
# Should return 404 if available
```

## Release Process

### Option 1: GitHub Actions (Recommended) 🚀

**Via GitHub UI:**
1. Go to **Actions** tab in your GitHub repository
2. Click **Manual Release** workflow
3. Click **Run workflow** button
4. Select version type: `patch` | `minor` | `major` | `prerelease`
5. For prerelease: choose identifier (`beta`, `alpha`, `rc`, etc.)
6. Click **Run workflow**

**What happens:**
- ✅ Version bumped in package.json
- ✅ Git tag created and pushed
- ✅ Triggers automatic npm publishing
- ✅ GitHub release created with changelog

### Option 2: Local Commands

```bash
# Make sure you're on main branch
git checkout main
git pull origin main

# Choose your release type:

# Patch release (1.0.0 → 1.0.1) - Bug fixes
npm run release:patch

# Minor release (1.0.0 → 1.1.0) - New features  
npm run release:minor

# Major release (1.0.0 → 2.0.0) - Breaking changes
npm run release:major

# Prerelease (1.0.0 → 1.0.1-0) - Beta/alpha
npm run release:prerelease
```

#### What Happens Automatically (Both Options)
1. **Version bump** - Updates package.json
2. **Git tag created** - Creates version tag (e.g., `v1.0.1`)
3. **Push to GitHub** - Pushes commit and tag
4. **GitHub Action triggers** - Runs on tag push
5. **Build & test** - Builds package and runs tests
6. **Version verification** - Ensures tag matches package.json
7. **npm publish** - Publishes to npm registry
8. **GitHub Release** - Creates release with changelog

### Manual Tag Creation (Alternative)
If you prefer manual control:

```bash
# Update version in package.json manually
# Then create and push tag:
git add package.json package-lock.json
git commit -m "chore: bump version to 1.0.1"
git tag v1.0.1
git push origin main --follow-tags
```

## Pre-Release Checklist

Run this before creating a release:
```bash
npm run publish:ready  # Runs pre-publish checks
npm run publish:check  # Dry-run npm publish
```

### What Gets Published
- [x] Built files in `dist/` directory
- [x] `package.json` and `package-lock.json`
- [x] `README.md` and `LICENSE`
- [x] TypeScript definitions (`.d.ts` files)
- [x] Both CommonJS (`.cjs`) and ESM (`.js`) formats

### What Gets Excluded
- [x] Source files (`src/` directory)
- [x] Demo files (`demo/` directory)  
- [x] Development configs (`vite.config.ts`, `tsup.config.ts`, etc.)
- [x] GitHub workflows (`.github/` directory)
- [x] Development dependencies

## Post-Publishing

### Verify Publication
```bash
# Check if package is published
npm info smooth-auto-scroll

# Test installation
mkdir test-install && cd test-install
npm init -y
npm install smooth-auto-scroll
```

### Monitor Release
- Check GitHub Actions for build status
- Verify npm package page: https://www.npmjs.com/package/smooth-auto-scroll
- Test the demo: https://marcderhammer.github.io/smooth-auto-scroll/

## Troubleshooting

### "Version mismatch" Error
- Ensure package.json version matches the git tag
- Tag format must be `v1.2.3` (with 'v' prefix)

### "NPM_TOKEN invalid" Error  
- Regenerate npm token: `npm token create --read-only=false`
- Update GitHub secret with new token

### "Build failed" Error
- Check GitHub Actions logs
- Ensure all tests pass locally
- Verify TypeScript compiles without errors

### Manual npm publish blocked
- This is intentional! Use `npm run release:patch|minor|major`
- Or create tags manually and let GitHub Actions handle publishing

## Security Notes

- ✅ npm tokens are stored securely in GitHub Secrets
- ✅ Publishing only happens via GitHub Actions
- ✅ All releases are tagged and traceable
- ✅ Build and test verification before publishing
- ✅ No manual npm publish access needed