# Changesets

This folder holds [changesets](https://github.com/changesets/changesets). Each
Markdown file declares one change, its semver bump, and its release note.

Run `pnpm changeset` to add one. Commit it with your change. The Release
workflow applies all pending changesets and publishes to npm. Start the
workflow by hand from the Actions tab.
