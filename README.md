Finnish IBAN and reference number validator/generator
=====================================================

[![Build Status](https://travis-ci.org/vkomulai/finnish-business-ids.svg?branch=master)](https://travis-ci.org/vkomulai/finnish-business-ids)

- A micro Javascript library for validating and creating Finnish IBAN bank account numbers and reference numbers
- Vanilla JS (ES6), no dependencies
- ES6 + Babel for browser compatibility

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
FinnishBusinessIds.isValidFinnishIBAN('FI9080002627761348')
```

Browser: Writes FinnishBusinessIds into global namespace.

``` html
<script src="finnish-business-ids.min.js"></script>
<script>
  FinnishBusinessIds.isValidFinnishIBAN('FI9080002627761348')
</script>

```

Examples
--------

```sh
# Valid IBAN returns true, allows whitespace
FinnishBusinessIds.isValidFinnishIBAN('FI9080002627761348')
FinnishBusinessIds.isValidFinnishIBAN('FI 90 800026 2776 1348')

# Validate any IBAN
FinnishBusinessIds.isValidIBAN('FI 90 800026 2776 1348')
```

```sh
# Valid reference number returns true, allows whitespace
# !! Reference number type must be a string !!
FinnishBusinessIds.isValidFinnishRefNumber('1511890656')
FinnishBusinessIds.isValidFinnishRefNumber('15118 90656')
```

```sh
# Generate a Finnish reference number
FinnishBusinessIds.generateFinnishRefNumber()
// '6173672848'
```

```sh
# Generate a Finnish IBAN
FinnishBusinessIds.generateFinnishRefIBAN()
// 'FI9080002627761348'
```

Functions
---------

##### isValidFinnishRefNumber(referenceNumber) : string --> boolean
-Validates parameter given reference number

##### isValidFinnishIBAN(ibanNumber) : string --> boolean
-Validates parameter given Finnish IBAN number

##### generateFinnishRefNumber() : void --> string
-Generates a random 10 char long Finnish reference number

##### generateFinnishIBAN() : void --> string
-Generates a random Finnish IBAN number

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
