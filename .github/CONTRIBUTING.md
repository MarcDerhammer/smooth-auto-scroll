# Contributing to smooth-auto-scroll

## Git Flow Workflow

This project follows a git-flow style workflow with automated releases.

### Branch Structure

- **`main`** - Production-ready code, triggers releases
- **`develop`** - Integration branch for features  
- **`feature/*`** - New features (branch from `develop`)
- **`bugfix/*`** - Bug fixes (branch from `develop`)
- **`hotfix/*`** - Critical fixes (branch from `main`)

### Development Workflow

#### 1. Feature Development
```bash
# Start a new feature
git checkout develop
git pull origin develop
git checkout -b feature/my-new-feature

# Work on your feature
git add .
git commit -m "feat: add new feature"

# Push and create PR to develop
git push origin feature/my-new-feature
```

#### 2. Bug Fixes
```bash
# Start a bug fix
git checkout develop
git pull origin develop
git checkout -b bugfix/fix-issue-123

# Fix the bug
git add .
git commit -m "fix: resolve issue with scrolling"

# Push and create PR to develop
git push origin bugfix/fix-issue-123
```

#### 3. Hotfixes (Critical Issues)
```bash
# Start a hotfix from main
git checkout main
git pull origin main
git checkout -b hotfix/1.0.1

# Fix critical issue
git add .
git commit -m "fix: critical security issue"

# Push - this will auto-create PR to main
git push origin hotfix/1.0.1
```

### Release Process

#### Automated Releases (Recommended)
Releases are automatically created when PRs are merged to `main`:

1. **Merge to main** - Triggers release workflow
2. **Auto-versioning** - Based on conventional commits
3. **Changelog** - Automatically generated
4. **npm publish** - Automatic if tests pass
5. **GitHub release** - Created with release notes

#### Manual Releases
If you need to manually trigger a release:

```bash
# Patch release (1.0.0 -> 1.0.1)
npm run release:patch

# Minor release (1.0.0 -> 1.1.0)  
npm run release:minor

# Major release (1.0.0 -> 2.0.0)
npm run release:major

# Prerelease (1.0.0 -> 1.0.1-0)
npm run release:prerelease
```

### Commit Message Convention

We use [Conventional Commits](https://conventionalcommits.org/) for automatic versioning:

#### Types
- **`feat:`** - New feature (minor version bump)
- **`fix:`** - Bug fix (patch version bump)  
- **`perf:`** - Performance improvement (patch version bump)
- **`BREAKING CHANGE:`** - Breaking change (major version bump)
- **`docs:`** - Documentation changes
- **`style:`** - Code style changes (formatting, etc.)
- **`refactor:`** - Code refactoring
- **`test:`** - Adding or updating tests
- **`chore:`** - Maintenance tasks

#### Examples
```bash
feat: add new auto-scroll direction option
fix: resolve memory leak in useEffect cleanup
perf: optimize scroll calculation performance
docs: update API documentation for new props
BREAKING CHANGE: remove deprecated pauseOnScroll prop
```

### Version Bumping Rules

- **Patch** (1.0.0 → 1.0.1): `fix:`, `perf:`, `docs:`
- **Minor** (1.0.0 → 1.1.0): `feat:`
- **Major** (1.0.0 → 2.0.0): `BREAKING CHANGE:`

### CI/CD Pipeline

#### Pull Request Checks
- ✅ Code builds successfully
- ✅ TypeScript type checking
- ✅ Demo builds without errors
- ✅ Tests pass (if any)
- ✅ Package can be published (dry run)

#### Release Pipeline
- ✅ Automated version bumping
- ✅ Changelog generation
- ✅ npm package publishing
- ✅ GitHub release creation
- ✅ Demo deployment to GitHub Pages

### Getting Started

1. **Fork the repository**
2. **Clone your fork**
3. **Install dependencies**: `npm install`
4. **Create feature branch**: `git checkout -b feature/my-feature`
5. **Make changes and commit**: `git commit -m "feat: my feature"`
6. **Push and create PR**: `git push origin feature/my-feature`

### Questions?

- Check existing [Issues](https://github.com/marcderhammer/smooth-auto-scroll/issues)
- Create a new issue for bugs or feature requests
- Join discussions in [Discussions](https://github.com/marcderhammer/smooth-auto-scroll/discussions)
