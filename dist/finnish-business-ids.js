"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BUSINESS_ID_REGEX = /^[\d]{7}-[\d]$/;
var VAT_NUMBER_REGEX = /^FI[\d]{8}$/;
var MULTIPLIERS = [7, 9, 10, 5, 8, 4, 2];
function randomBusinessIdWithoutChecksum() {
    return (Math.floor(Math.random() * 1000000) + 1000000).toString();
}
console.log('2');
var FinnishBusinessIds = /** @class */ (function () {
    function FinnishBusinessIds() {
    }
    FinnishBusinessIds.isValidBusinessId = function (businessId) {
        if (!BUSINESS_ID_REGEX.test(businessId)) {
            return false;
        }
        var givenChecksum = parseInt(businessId.substring(8, 9), 10);
        var idNumbers = businessId.substring(0, 7);
        var calculatedChecksum = FinnishBusinessIds.calculateChecksum(idNumbers);
        return calculatedChecksum === givenChecksum;
    };
    FinnishBusinessIds.isValidVatNumber = function (vatNumber) {
        if (!VAT_NUMBER_REGEX.test(vatNumber)) {
            return false;
        }
        var vatAsBusinessId = vatNumber.substring(2, 9) + "-" + vatNumber.substring(9, 10);
        return this.isValidBusinessId(vatAsBusinessId);
    };
    FinnishBusinessIds.generateBusinessId = function () {
        var businessId = randomBusinessIdWithoutChecksum();
        var checksum = FinnishBusinessIds.calculateChecksum(businessId);
        return businessId + "-" + checksum;
    };
    FinnishBusinessIds.generateVatNumber = function () {
        var countryCode = 'FI';
        var businessId = randomBusinessIdWithoutChecksum();
        var checksum = FinnishBusinessIds.calculateChecksum(businessId);
        return countryCode + businessId + checksum;
    };
    FinnishBusinessIds.calculateChecksum = function (idNumbers) {
        var sum = 0;
        for (var i = 0; i < idNumbers.length; i++) {
            sum += parseInt(idNumbers[i], 10) * MULTIPLIERS[i];
        }
        var remainder = sum % 11;
        if (remainder > 1) {
            remainder = 11 - remainder;
        }
        return remainder;
    };
    return FinnishBusinessIds;
}());
exports.FinnishBusinessIds = FinnishBusinessIds;
