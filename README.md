# Utah Vis Collective Website

This repository contains the source code and supporting files for the Utah Vis Collective group site.

The website is developed in [SvelteKit](https://kit.svelte.dev/). The data backing the application can be found in the uvc-content google sheet, ask permission if you need to edit it.

### Running The Website Locally

After cloning, run the following standard web development commands:

```sh
yarn       # install the dependencies
yarn test  # prepare and check needed files
yarn dev   # start the dev server
```

This will start up a dev server, most likely on http://localhost:5173/. Navigate there and you'll have nice auto reload on save. If your changes are not being updated (such as to your recently added paper) you may need to run `yarn test` to trigger some of the integrity checkers.

### Build Process

To build the web site locally run:

```sh
yarn build
```

Then to preview the build do:

```sh
yarn preview
```

However! It is unlikely you will need to do a full build of the website locally. Deployed builds are run by GitHub. The right way to trigger them is to open a PR, and the rest should take care of itself.
