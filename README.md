# Sin.ai Website Builder
Static Website Builder and a Foundation for *Simple Rick's Vanilla Website Builder*.

## Prerequisites

- [Node.js](https://nodejs.org/en/download)

## Optional HTML templating engine

This project **optionally** uses Pug for HTML!
- [Pug](https://pugjs.org/api/getting-started.html)

## Getting started

- Install all dependencies: `npm install`
- Start the dev server: `npm start`
- Build production app: `npm run build`

## Folder structure

* docs = dist
* scripts = mostly bundler replacement scripts
* source = src

## PWA and HTTPS on localhost

For PWA development, for some reason, it is mandatory to use a valid SSL Certificate on localhost.

The easiest way for this is to use [mkcert](https://github.com/FiloSottile/mkcert).

## Update NPM Packages

Do not update chalk and purgecss, for now! There is no CommonJS support in the next major versions.

- npm outdated
- npx npm-check-updates -u --target minor
- npm install

## How to Contribute

If you're interested in helping improve the Sin.ai or the Website Builder, here are some ways you can contribute:

1. **Reporting Bugs**: If you find a bug, please open an issue in the GitHub repository with a detailed description of the problem, steps to reproduce it, and any relevant logs or screenshots.

2. **Suggesting Enhancements**: Have ideas for new features or improvements? Open an issue to discuss your suggestions. This is a great way to contribute ideas even if you're not ready to write the code.

3. **Submitting Pull Requests**: Ready to jump into the code? Great! You can look at the open issues for ideas on what to work on. Please ensure that your code follows the project's coding conventions and include tests where applicable.

4. **Documentation**: Improving or writing documentation is another great way to contribute. Whether it's fixing typos or adding new sections, all documentation updates are welcome.

Thank you for considering contributing to the Sin.ai Website Builder. Every contribution is appreciated!

## License and Brand Use

### Code License
The source code for Sin.ai Website Builder is licensed under the [European Union Public License 1.2 (EUPL 1.2)](https://joinup.ec.europa.eu/collection/eupl/eupl-text-11-12). Please refer to the LICENSE file in the repository for the full license text.

### Brand and Image Use
While the source code is open for modification and redistribution under the EUPL 1.2, the Sin.ai brand and visual identity are not included in this license. We ask that contributors and users of the project do not use the Sin.ai brand or visual identity as their own.

Additionally, any images provided in the repository or associated with the Sin.ai Website Builder are licensed under the [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](https://creativecommons.org/licenses/by-nc-sa/4.0/). This means you can share and adapt these images non-commercially, as long as you provide attribution and distribute your contributions under the same license.

## Project Roadmap

* Create Roadmap