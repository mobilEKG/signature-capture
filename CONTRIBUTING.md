# Contributing

Thanks for helping improve Signature Capture.

## Development Setup

```bash
npm install
npm run dev
```

Before opening a pull request, run:

```bash
npm run lint
npm run build
```

## Project Priorities

- Keep signature processing local to the browser.
- Do not add server uploads for captured signatures without a clear privacy review.
- Keep UI changes consistent with the existing dark green visual system.
- Prefer simple browser APIs and small, auditable code paths.
- Avoid committing secrets, generated credentials, `.env` files, or personal test data.

## Pull Request Checklist

- Describe the user-facing change.
- Include screenshots or short screen recordings for UI work.
- Mention browser and device coverage for camera or layout changes.
- Update README documentation when behavior, deployment, or setup changes.
- Confirm lint and build pass locally.

## Reporting Issues

For normal bugs and feature ideas, use the GitHub issue templates in `.github/ISSUE_TEMPLATE`.

For security or privacy concerns, follow [SECURITY.md](./SECURITY.md) instead of opening a public issue.
