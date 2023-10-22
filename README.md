# Private Sin.ai
And a Foundation for Simple Rick's Vanilla PWA Builder -> realityland/vanilla-pwa-builder

### Prerequisites

- [Node.js](https://nodejs.org/en/download)

## Development

This project **optionally** uses Pug for HTML!
- [Pug](https://pugjs.org/api/getting-started.html)

## PWA and HTTPS

For PWA development, for some reason, it is mandatory to use a valid SSL Certificate.

In Chrome, there is the option allow insecure localhsot, but at the moment, it seems to be broken.

Chrome://Flags/#Allow-Insecure-Localhost

The best way is to use mkcert.

### Run locally

- Install all dependencies: `npm install`
- Start the dev server: `npm start`
- Build production app: `npm run build`

## Update NPM Packages

Do not update chalk and purgecss, for now! (no commonjs support)

- npm outdated
- npx npm-check-updates -u --target minor
- npx npm-check-updates -u -i
- npm i