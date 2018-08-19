(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../src/finnish-business-ids", "chai"], factory);
    }
})(function (require, exports) {
    'use strict';
    Object.defineProperty(exports, "__esModule", { value: true });
    var finnish_business_ids_1 = require("../src/finnish-business-ids");
    var chai_1 = require("chai");
    describe('finnish-business-ids', function () {
        describe('#isValidBusinessId', function () {
            it('Should fail when given empty String', function () {
                chai_1.expect(finnish_business_ids_1.FinnishBusinessIds.isValidBusinessId('')).to.equal(false);
            });
            it('Should fail when given too short business ID', function () {
                chai_1.expect(finnish_business_ids_1.FinnishBusinessIds.isValidBusinessId('261741-4')).to.equal(false);
            });
            it('Should fail when given too long business ID', function () {
                chai_1.expect(finnish_business_ids_1.FinnishBusinessIds.isValidBusinessId('2617416-44')).to.equal(false);
            });
            it('Should pass when given valid business IDs', function () {
                var knownValidBusinessIds = ['1790235-0',
                    '1643256-1',
                    '0114162-2',
                    '1633241-3',
                    '2617416-4',
                    '1629284-5',
                    '1008663-7',
                    '0109862-8',
                    '1837954-9'];
                knownValidBusinessIds.forEach(function (businessId) {
                    chai_1.expect(finnish_business_ids_1.FinnishBusinessIds.isValidBusinessId(businessId)).to.equal(true);
                });
            });
        });
        describe('#isValidVatNumber', function () {
            it('Should fail when given empty String', function () {
                chai_1.expect(finnish_business_ids_1.FinnishBusinessIds.isValidVatNumber('')).to.equal(false);
            });
            it('Should fail when given almost valid vat number nonsense in the end', function () {
                chai_1.expect(finnish_business_ids_1.FinnishBusinessIds.isValidVatNumber('FI26174164A')).to.equal(false);
            });
            it('Should fail when given almost valid vat number with nonsense in the beginning', function () {
                chai_1.expect(finnish_business_ids_1.FinnishBusinessIds.isValidVatNumber('AFI26174164')).to.equal(false);
            });
            it('Should pass when given valid vat number', function () {
                var knownValidVatNumbers = ['FI17902350',
                    'FI16432561',
                    'FI01141622',
                    'FI16332413',
                    'FI26174164',
                    'FI16292845',
                    'FI10086637',
                    'FI01098628',
                    'FI18379549'];
                knownValidVatNumbers.forEach(function (vatNumber) {
                    chai_1.expect(finnish_business_ids_1.FinnishBusinessIds.isValidVatNumber(vatNumber)).to.equal(true);
                });
            });
        });
        describe('#generateBusinessId', function () {
            it('Should create valid random business ID with a sample of 10000', function () {
                for (var i = 0; i < 10000; i++) {
                    var generated = finnish_business_ids_1.FinnishBusinessIds.generateBusinessId();
                    chai_1.expect(finnish_business_ids_1.FinnishBusinessIds.isValidBusinessId(generated)).to.equal(true);
                }
            });
        });
        describe('#generateVatNumber', function () {
            it('Should create valid random vat number with a sample of 10000', function () {
                for (var i = 0; i < 10000; i++) {
                    var generated = finnish_business_ids_1.FinnishBusinessIds.generateVatNumber();
                    chai_1.expect(finnish_business_ids_1.FinnishBusinessIds.isValidVatNumber(generated)).to.equal(true);
                }
            });
        });
        describe('#calculateChecksum', function () {
            it('Should return valid checksum for business ID', function () {
                chai_1.expect(finnish_business_ids_1.FinnishBusinessIds.calculateChecksum('1629284')).to.equal(5);
            });
        });
    });
});
