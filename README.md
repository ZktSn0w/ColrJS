<!-- @format -->

# Vay.js

[![Npm package version](https://badgen.net/npm/v/colrjs)](https://www.npmjs.com/package/colrjs)[![Npm package total downloads](https://badgen.net/npm/dt/colrjs)](https://npmjs.com/package/colrjs)[![Npm package license](https://badgen.net/npm/license/colrjs)](https://npmjs.com/package/colrjs)[![Github tag](https://badgen.net/github/tag/ZktSn0w/ColrJS)](https://github.com/ZktSn0w/ColrJS/tags)

A lightweight, modern, extendable Color Palette extractor that can be used in the browser or in a node.js context.

## Installing

To use **ColrJS** with node and/or a bundler such as webpack or rollup, install it via yarn or npm:

```bash
yarn add colrjs
# or use npm
npm install colrjs
```

You can also use it directly in the browser and include it via CDN or locally.

```html
<head>
    ...
    <!-- as a local file -->
    <script src="./your/path/to/colrjs.browser.min.js"></script>
    <!-- or via CDN -->
    <script src="http://unpkg.com/colrjs"></script>
    ...
</head>
```

## Getting started

Setting up the initial **ColrJS** instance is quick and requires only a configuration object. **ColrJS** provides functions to create one, to utilize editor autocompletion and type safety. For a more in depth guide on how to use **ColrJS**, take a look at the full [documentation](./docs/readme.md).

Start by importing or destructuring the required methods. You are free to use module or import syntax, **ColrJS** provides export for both standards. When included via CDN or locally, destructuring the globally accessible `ColrJS` property is the easiest way to access the API.

```js
// node require syntax
const { ColrJS, defineConfig } = require('colrjs');

// modern es6 style syntax
import { ColrJS, defineConfig } from 'colrjs';

// if added to the global namespace
const { ColrJS, defineConfig } = ColrJS;
```

### Creating a `ColrJS` instance

To use **ColrJS**, create a new instance and pass a configuration object containing a Processor to it as parameters.

> Note: The examples below assumes you're using es6.

```ts
import { defineConfig, ColrJS, Monochromatic } from 'colrjs';

// create a processor configuration
const config = defineConfig({
    processors: {
        mono: Monochromatic(5),
    },
});

const colr = new ColrJS(config);

// You can now extract a Palette by using the extract Palette method.
const monochromaticPalette = await colr.extractPalette(<pixelArray>).mono();
```

## Contributing

If you would like to contribute, take a look at the [contribution guide](./contributing.md).

## License

**Vay** is licensed under the MIT License
