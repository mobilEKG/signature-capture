# Security Policy

Signature Capture is designed so captured signature images stay on the user's device.

## Supported Versions

The hosted app and the default branch are the supported version of this project.

## Reporting a Vulnerability

Please do not open a public issue for security or privacy vulnerabilities.

Report concerns by contacting the project maintainer through the repository host profile or a private repository message when available.

Useful details include:

- A short description of the issue.
- Steps to reproduce.
- Browser, OS, and device details.
- Whether captured signature data could leave the device.
- Any suggested fix or mitigation.

## Scope

Security-sensitive areas include:

- Camera permission handling.
- Clipboard and download behavior.
- Service worker caching.
- Any change that could transmit captured images off-device.
- Any committed credential, token, private key, or personal data.
