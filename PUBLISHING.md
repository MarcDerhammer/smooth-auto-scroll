# Publishing Guide

This guide walks you through publishing `smooth-auto-scroll` to npm using **pure git-flow**.

## 🔄 Pure Git-Flow Process

This package uses **pure git-flow** where release branches determine the version, and merging to main triggers automated publishing.

## Prerequisites

### GitHub Repository Setup
**Required GitHub Secret:**
- Add `NPM_TOKEN` to GitHub repository secrets
- Go to Settings → Secrets and variables → Actions
- Add new repository secret: `NPM_TOKEN`

To get your npm token:
```bash
npm login  # Login to npm
npm token create --read-only=false  # Create automation token
```

## Release Process

### 1. Create Release Branch 🌿

```bash
# Start from develop
git checkout develop
git pull origin develop

# Create release branch
git checkout -b release/v1.2.3

# Update version in package.json (manually or with npm)
npm version 1.2.3 --no-git-tag-version

# Commit version change
git add package.json package-lock.json
git commit -m "chore: prepare release v1.2.3"

# Push release branch
git push -u origin release/v1.2.3
```

### 2. Create PR and Merge ➡️

1. **Create PR**: `release/v1.2.3` → `main`
2. **Review changes**
3. **Merge PR**

### 3. Automatic Publishing 🚀

**When you merge to main**, the workflow automatically:

1. ✅ **Detects version change** in package.json
2. ✅ **Builds and tests** the package
3. ✅ **Creates git tag** (e.g., `v1.2.3`)
4. ✅ **Publishes to npm**
5. ✅ **Creates GitHub release** with changelog
6. ✅ **Syncs develop branch** - merges main back to develop

**If no version change is detected, nothing happens** - safe merges! ✨

### 4. Clean Up 🧹

```bash
# Delete local release branch (develop already synced automatically)
git checkout develop
git pull origin develop  # Get the synced changes
git branch -d release/v1.2.3

# Delete remote release branch
git push origin --delete release/v1.2.3
```

**Note**: The develop branch is automatically synced with main after every release!

## Version Types

### Semantic Versioning
- **Patch** (`1.0.0` → `1.0.1`): Bug fixes
- **Minor** (`1.0.0` → `1.1.0`): New features
- **Major** (`1.0.0` → `2.0.0`): Breaking changes
- **Prerelease** (`1.0.0` → `1.1.0-beta.1`): Beta/alpha versions

### Examples
```bash
# Patch release
npm version patch --no-git-tag-version

# Minor release  
npm version minor --no-git-tag-version

# Major release
npm version major --no-git-tag-version

# Prerelease
npm version prerelease --preid=beta --no-git-tag-version
```

## What Gets Published

### Included ✅
- Built files in `dist/` directory
- `package.json` and `package-lock.json`
- `README.md` and `LICENSE`
- TypeScript definitions (`.d.ts` files)
- Both CommonJS (`.cjs`) and ESM (`.js`) formats

### Excluded ❌
- Source files (`src/` directory)
- Demo files (`demo/` directory)
- Development configs (`vite.config.ts`, `tsup.config.ts`, etc.)
- GitHub workflows (`.github/` directory)
- Development dependencies

## Verification

### Check Publication
```bash
# Check if package is published
npm info smooth-auto-scroll

# Test installation
mkdir test-install && cd test-install
npm init -y
npm install smooth-auto-scroll
```

### Monitor Release
- **GitHub Actions**: Check workflow status
- **npm**: https://www.npmjs.com/package/smooth-auto-scroll
- **Demo**: https://marcderhammer.github.io/smooth-auto-scroll/

## Troubleshooting

### "No release triggered"
- Ensure package.json version changed from previous commit
- Check that the version doesn't already exist as a git tag

### "Build failed"
- Check GitHub Actions logs
- Ensure all tests pass locally: `npm test`
- Verify TypeScript compiles: `npm run build`

### "npm publish failed"
- Check `NPM_TOKEN` is valid and has publish permissions
- Ensure package name isn't taken
- Verify you're not publishing same version twice

## Security Notes

- ✅ npm tokens stored securely in GitHub Secrets
- ✅ Publishing only via GitHub Actions on main branch
- ✅ All releases are tagged and traceable
- ✅ Version-controlled release process
- ✅ No manual npm access required
- ✅ Safe merges (no accidental releases)