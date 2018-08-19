Finnish business id and vat number validator/generator
======================================================

[![Build Status](https://travis-ci.org/vkomulai/finnish-business-ids.svg?branch=master)](https://travis-ci.org/vkomulai/finnish-business-ids) ![0 deps](https://david-dm.org/vkomulai/finnish-business-ids.svg) ![Downloads](https://img.shields.io/npm/dt/finnish-business-ids.svg) ![License](https://img.shields.io/npm/l/finnish-business-ids.svg)

- A micro library for validating and creating Finnish business ids (y-tunnus, alv-numero)
- Lightweight, less than 10kb
- No dependencies
- Written in Typescript, typescript types available out-of-the-box

Installation
------------

```sh
# NPM
npm install finnish-business-ids --save

# yarn 
yarn add finnish-business-ids
```

Usage
-----

Node.js

Javascript
``` js
const { FinnishBusinessIds } = require('finnish-business-ids')

const validId = FinnishBusinessIds.isValidBusinessId('2617416-4')
console.log('validId:', validId)
```

Typescript
``` typescript
import { FinnishBusinessIds } from 'finnish-business-ids'

const validId: boolean = FinnishBusinessIds.isValidBusinessId('2617416-4')
console.log('validId:', validId)
```

Examples
--------

- [Typescript examples](examples/typescript/index.ts)
- [Javascript examples](examples/javascript/index.ts)

Functions
---------

##### isValidBusinessId(businessId: string) : boolean

- Validates parameter given business id (y-tunnus), format: 1234567-8

##### isValidVatNumber(vatNumber: string) : boolean

- Validates parameter given Finnish vat number (alv-numero), format: FI12345678

##### generateBusinessId() : string

- Generates a random Finnish business id

##### generateVatNumber() : string

- Generates a random Finnish vat number

##### calculateChecksum(idNumbers: string) : number

- Calculates checksum for parameter given business id without checksum, format: 1234567

Changelog
---------
[CHANGELOG](CHANGELOG.md)

Building
--------

```sh
# Build a distributable minified library
npm run dist

# Run linter
npm run lint

# Run tests
npm run test
```

Release a new version
---------------------

- `npm run dist`
- Update version number in `package.json`. Follow [semantic versioning](https://docs.npmjs.com/getting-started/semantic-versioning) 
- `npm publish`


License
-------
[MIT License](LICENSE)
