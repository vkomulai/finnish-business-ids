Finnish business id and vat number validator/generator
======================================================

[![Build Status](https://travis-ci.org/vkomulai/finnish-business-ids.svg?branch=master)](https://travis-ci.org/vkomulai/finnish-business-ids)

- A micro library for validating and creating Finnish business ids (y-tunnus, alv-numero)
- Lightweight, 1.8kB
- No dependencies
- Vanilla JS (ES6) + Babel for browser compatibility

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

##### isValidBusinessId(businessId) : string --> boolean
-Validates parameter given business id (y-tunnus), format: 1234567-8

##### isValidVatNumber(vatNumber) : string --> boolean
-Validates parameter given Finnish vat number (alv-numero), format: FI12345678

##### generateBusinessId() : void --> string
-Generates a random Finnish business id

##### generateVatNumber() : void --> string
-Generates a random Finnish vat number

Building
--------

```sh
# Build a distributable, minified UMD library compatible with browsers and Node
npm run dist

# Run tests
npm run test
```

License
-------
[MIT License](LICENSE)
