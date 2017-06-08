Finnish business id and vat number validator/generator
======================================================

[![Build Status](https://travis-ci.org/vkomulai/finnish-business-ids.svg?branch=master)](https://travis-ci.org/vkomulai/finnish-business-ids) ![0 deps](https://david-dm.org/vkomulai/finnish-business-ids.svg) ![Downloads](https://img.shields.io/npm/dt/finnish-business-ids.svg) ![License](https://img.shields.io/npm/l/finnish-business-ids.svg)

- A micro library for validating and creating Finnish business ids (y-tunnus, alv-numero)
- Lightweight, 4.3kB
- No dependencies
- ES6 + Babel for compatibility

Installation
------------

```sh
# NPM
npm install finnish-business-ids

# Bower
bower install finnish-business-ids
```

Usage
-----

Node.js

``` js
const FinnishBusinessIds = require('finnish-business-ids')
FinnishBusinessIds.isValidBusinessId('2617416-4')
```

Browser: Writes FinnishBusinessIds into global namespace.

``` html
<script src="finnish-business-ids.min.js"></script>
<script>
  FinnishBusinessIds.isValidBusinessId('2617416-4')
</script>

```

Examples
--------

- [Example page for testing purposes](test/index.html)

```sh
# Valid isValidVatNumber returns true, allows whitespace
FinnishBusinessIds.isValidBusinessId('2617416-4')
// true
FinnishBusinessIds.isValidVatNumber('FI26174164')
// true
```

```sh
# Generate a Finnish business id (y-tunnus), format: 1234567-8
FinnishBusinessIds.generateBusinessId()
// '2617416-4'

# Generate a Finnish vat number (alv-numero), format: FI12345678
FinnishBusinessIds.generateVatNumber()
// 'FI26174164'
```

Functions
---------

- Validation functions return TypeError when unexpected type is passed as a parameter.
- Using [Flow](https://flowtype.org/) annotations for static type checking

##### isValidBusinessId(businessId: string) : string --> boolean
-Validates parameter given business id (y-tunnus), format: 1234567-8
-A TypeError is thrown in case of non-string parameter

##### isValidVatNumber(vatNumber: string) : string --> boolean
-Validates parameter given Finnish vat number (alv-numero), format: FI12345678
-A TypeError is thrown in case of non-string parameter

##### generateBusinessId() : void --> string
-Generates a random Finnish business id

##### generateVatNumber() : void --> string
-Generates a random Finnish vat number

##### calculateChecksum(idNumbers: string) : string --> number
-Calculates checksum for parameter given business id without checksum, format: 1234567
-A TypeError is thrown in case of non-string parameter

Changelog
---------
[CHANGELOG](CHANGELOG.md)

Building
--------

```sh
# Build a distributable, minified UMD library compatible with browsers and Node
npm run dist

# Run static type checkts using flow
npm run flow

# Run tests
npm run test
```

License
-------
[MIT License](LICENSE)
