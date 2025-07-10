# GitHub Actions Configuration

This repository now includes comprehensive GitHub Actions workflows for continuous integration and automated releases.

## Workflows

### CI Workflow (`.github/workflows/ci.yml`)

**Trigger:** Push to `main`/`master` branches and pull requests
**Node.js versions:** 16.x, 18.x, 20.x (as specified in issue #1)

**Features:**
- ✅ Uses `actions/checkout@v4` for code checkout
- ✅ Uses `actions/setup-node@v4` with yarn caching 
- ✅ Automated linting with `xo`
- ✅ Documentation generation
- ✅ Build artifact verification
- 🚧 Codecov integration ready (commented out, waiting for test coverage)

### Release Workflow (`.github/workflows/release.yml`)

**Trigger:** Manual dispatch or commit messages containing `[release]`
**Node.js version:** 20.x

**Features:**
- ✅ Manual release control via GitHub UI
- ✅ Pre-configured for yarn-based builds
- ✅ Test validation before release
- 🚧 npm publishing ready (commented out, waiting for NPM_TOKEN secret)
- 🚧 Semantic-release configuration included

## Dependencies Management

### Dependabot (`.github/dependabot.yml`)
- Weekly dependency updates for npm packages
- Weekly GitHub Actions updates
- Automatic assignment to repository owner

## Semantic Release

Configuration file `.releaserc.json` is included and ready for:
- Automated versioning based on commit messages
- Changelog generation
- npm publishing
- GitHub releases

## Setup Instructions

### To Enable Automatic npm Publishing:

1. **Add npm token to repository secrets:**
   ```
   Repository Settings > Secrets and variables > Actions > New repository secret
   Name: NPM_TOKEN
   Value: your_npm_token_here
   ```

2. **Uncomment publishing steps in `.github/workflows/release.yml`**

3. **Optional: Configure semantic-release by uncommenting relevant sections**

### To Enable Code Coverage:

1. **Add test coverage generation to package.json scripts**
2. **Add Codecov token if using private repository**
3. **Uncomment codecov steps in CI workflow**

## Current Status

- ✅ CI workflow active and functional
- ✅ Multi-Node.js version testing (16.x, 18.x, 20.x)
- ✅ Yarn caching configured
- ✅ Linting automation active
- ✅ Documentation generation automated
- ✅ Dependabot dependency management active
- 🚧 Release workflow configured but publishing disabled for safety
- 🚧 Codecov integration ready but commented out

All workflows follow the established GitHub Actions specified in issue #1 requirements.