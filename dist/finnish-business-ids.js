(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define('FinnishBusinessIds', ['module'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod);
    global.FinnishBusinessIds = mod.exports;
  }
})(this, function (module) {
  'use strict';

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
  };

  var BUSINESS_ID_REGEX = /^[\d]{7}-[\d]$/,
      VAT_NUMBER_REGEX = /^FI[\d]{8}$/,
      MULTIPLIERS = [7, 9, 10, 5, 8, 4, 2];

  function randomBusinessIdWithoutChecksum() {
    var randomNumber = '';
    for (var i = 0; i < 7; i++) {
      randomNumber += Math.floor(Math.random() * 9) + 1; //  1...9, because a real number can't begin with zero
    }
    return randomNumber;
  }

  var FinnishBusinessIds = {
    isValidBusinessId: function isValidBusinessId(businessId) {
      if (!(typeof businessId === 'string')) {
        throw new TypeError('Value of argument "businessId" violates contract.\n\nExpected:\nstring\n\nGot:\n' + _inspect(businessId));
      }

      if (!BUSINESS_ID_REGEX.test(businessId)) {
        return false;
      }
      var givenChecksum = parseInt(businessId.substring(8, 9), 10),
          idNumbers = businessId.substring(0, 7),
          calculatedChecksum = this.calculateChecksum(idNumbers);

      return calculatedChecksum === givenChecksum;
    },
    isValidVatNumber: function isValidVatNumber(vatNumber) {
      function _isValidVatNumber(_id3) {
        if (!(typeof _id3 === 'boolean')) {
          throw new TypeError('Function return value violates contract.\n\nExpected:\nbool\n\nGot:\n' + _inspect(_id3));
        }

        return _id3;
      }

      if (!(typeof vatNumber === 'string')) {
        throw new TypeError('Value of argument "vatNumber" violates contract.\n\nExpected:\nstring\n\nGot:\n' + _inspect(vatNumber));
      }

      if (!VAT_NUMBER_REGEX.test(vatNumber)) {
        return false;
      }
      var vatAsBusinessId = vatNumber.substring(2, 9) + '-' + vatNumber.substring(9, 10);
      return _isValidVatNumber(this.isValidBusinessId(vatAsBusinessId));
    },
    generateBusinessId: function generateBusinessId() {
      function _generateBusinessId(_id4) {
        if (!(typeof _id4 === 'string')) {
          throw new TypeError('Function return value violates contract.\n\nExpected:\nstring\n\nGot:\n' + _inspect(_id4));
        }

        return _id4;
      }

      var businessId = randomBusinessIdWithoutChecksum();
      var checksum = this.calculateChecksum(businessId);
      return _generateBusinessId(businessId + '-' + checksum);
    },
    generateVatNumber: function generateVatNumber() {
      function _generateVatNumber(_id5) {
        if (!(typeof _id5 === 'string')) {
          throw new TypeError('Function return value violates contract.\n\nExpected:\nstring\n\nGot:\n' + _inspect(_id5));
        }

        return _id5;
      }

      var countryCode = 'FI';
      var businessId = randomBusinessIdWithoutChecksum();
      var checksum = this.calculateChecksum(businessId);
      return _generateVatNumber(countryCode + businessId + checksum);
    },
    calculateChecksum: function calculateChecksum(idNumbers) {
      if (!(typeof idNumbers === 'string')) {
        throw new TypeError('Value of argument "idNumbers" violates contract.\n\nExpected:\nstring\n\nGot:\n' + _inspect(idNumbers));
      }

      var sum = 0;
      for (var i = 0; i < idNumbers.length; i++) {
        sum += parseInt(idNumbers[i], 10) * MULTIPLIERS[i];
      }
      var remainder = sum % 11;
      if (remainder > 1) {
        remainder = 11 - remainder;
      }
      return remainder;
    }
  };

  module.exports = FinnishBusinessIds;

  function _inspect(input, depth) {
    var maxDepth = 4;
    var maxKeys = 15;

    if (depth === undefined) {
      depth = 0;
    }

    depth += 1;

    if (input === null) {
      return 'null';
    } else if (input === undefined) {
      return 'void';
    } else if (typeof input === 'string' || typeof input === 'number' || typeof input === 'boolean') {
      return typeof input === 'undefined' ? 'undefined' : _typeof(input);
    } else if (Array.isArray(input)) {
      if (input.length > 0) {
        var _ret = function () {
          if (depth > maxDepth) return {
            v: '[...]'
          };

          var first = _inspect(input[0], depth);

          if (input.every(function (item) {
            return _inspect(item, depth) === first;
          })) {
            return {
              v: first.trim() + '[]'
            };
          } else {
            return {
              v: '[' + input.slice(0, maxKeys).map(function (item) {
                return _inspect(item, depth);
              }).join(', ') + (input.length >= maxKeys ? ', ...' : '') + ']'
            };
          }
        }();

        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
      } else {
        return 'Array';
      }
    } else {
      var keys = Object.keys(input);

      if (!keys.length) {
        if (input.constructor && input.constructor.name && input.constructor.name !== 'Object') {
          return input.constructor.name;
        } else {
          return 'Object';
        }
      }

      if (depth > maxDepth) return '{...}';
      var indent = '  '.repeat(depth - 1);
      var entries = keys.slice(0, maxKeys).map(function (key) {
        return (/^([A-Z_$][A-Z0-9_$]*)$/i.test(key) ? key : JSON.stringify(key)) + ': ' + _inspect(input[key], depth) + ';';
      }).join('\n  ' + indent);

      if (keys.length >= maxKeys) {
        entries += '\n  ' + indent + '...';
      }

      if (input.constructor && input.constructor.name && input.constructor.name !== 'Object') {
        return input.constructor.name + ' {\n  ' + indent + entries + '\n' + indent + '}';
      } else {
        return '{\n  ' + indent + entries + '\n' + indent + '}';
      }
    }
  }
});

