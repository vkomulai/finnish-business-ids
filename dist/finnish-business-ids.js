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
      if (typeof businessId !== 'string' || !BUSINESS_ID_REGEX.test(businessId)) {
        return false;
      }
      var givenChecksum = parseInt(businessId.substring(8, 9), 10),
          idNumbers = businessId.substring(0, 7),
          calculatedChecksum = this.calculateChecksum(idNumbers);

      return calculatedChecksum === givenChecksum;
    },
    isValidVatNumber: function isValidVatNumber(vatNumber) {
      if (typeof vatNumber !== 'string' || !VAT_NUMBER_REGEX.test(vatNumber)) {
        return false;
      }
      var vatAsBusinessId = vatNumber.substring(2, 9) + '-' + vatNumber.substring(9, 10);
      return this.isValidBusinessId(vatAsBusinessId);
    },
    generateBusinessId: function generateBusinessId() {
      var businessId = randomBusinessIdWithoutChecksum();
      var checksum = this.calculateChecksum(businessId);
      return businessId + '-' + checksum;
    },
    generateVatNumber: function generateVatNumber() {
      var countryCode = 'FI';
      var businessId = randomBusinessIdWithoutChecksum();
      var checksum = this.calculateChecksum(businessId);
      return countryCode + businessId + checksum;
    },
    calculateChecksum: function calculateChecksum(idNumbers) {
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
});

