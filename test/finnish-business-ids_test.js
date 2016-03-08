'use strict';
const finnishBusinessIds = require('../src/finnish-business-ids'),
      expect = require('chai').expect

describe('finnish-business-ids', () => {

  describe('#isValidBusinessId', () => {
    it('Should fail when given empty String', () => {
      expect(finnishBusinessIds.isValidBusinessId('')).to.equal(false)
    })

    it('Should fail when given undefined', () => {
      expect(finnishBusinessIds.isValidBusinessId(undefined)).to.equal(false)
    })

    it('Should fail when given null String', () => {
      expect(finnishBusinessIds.isValidBusinessId(null)).to.equal(false)
    })

    it('Should fail when given too short business ID', () => {
      expect(finnishBusinessIds.isValidBusinessId('261741-4')).to.equal(false)
    })

    it('Should fail when given too long business ID', () => {
      expect(finnishBusinessIds.isValidBusinessId('2617416-44')).to.equal(false)
    })

    it('Should pass when given valid business IDs', () => {
      const knownValidBusinessIds = ['1790235-0',
                                     '1643256-1',
                                     '0114162-2',
                                     '1633241-3',
                                     '2617416-4',
                                     '1629284-5',
                                     '1008663-7',
                                     '0109862-8',
                                     '1837954-9']
      knownValidBusinessIds.forEach((businessId) => {
        expect(finnishBusinessIds.isValidBusinessId(businessId)).to.equal(true)
      })
    })

  })

  describe('#isValidVatNumber', () => {
    it('Should fail when given empty String', () => {
      expect(finnishBusinessIds.isValidVatNumber('')).to.equal(false)
    })

    it('Should fail when given undefined', () => {
      expect(finnishBusinessIds.isValidVatNumber(undefined)).to.equal(false)
    })

    it('Should fail when given null String', () => {
      expect(finnishBusinessIds.isValidVatNumber(null)).to.equal(false)
    })

    it('Should fail when given non String', () => {
      expect(finnishBusinessIds.isValidVatNumber({})).to.equal(false)
      expect(finnishBusinessIds.isValidVatNumber(Date())).to.equal(false)
      expect(finnishBusinessIds.isValidVatNumber(3)).to.equal(false)
      expect(finnishBusinessIds.isValidVatNumber(['a'])).to.equal(false)
      expect(finnishBusinessIds.isValidVatNumber(NaN)).to.equal(false)
    })

    it('Should fail when given almost valid vat number nonsense in the end', () => {
      expect(finnishBusinessIds.isValidVatNumber('FI26174164A')).to.equal(false)
    })

    it('Should fail when given almost valid vat number with nonsense in the beginning', () => {
      expect(finnishBusinessIds.isValidVatNumber('AFI26174164')).to.equal(false)
    })

    it('Should pass when given valid vat number', () => {
      const knownValidVatNumbers = ['FI17902350',
                                    'FI16432561',
                                    'FI01141622',
                                    'FI16332413',
                                    'FI26174164',
                                    'FI16292845',
                                    'FI10086637',
                                    'FI01098628',
                                    'FI18379549']
      knownValidVatNumbers.forEach((vatNumber) => {
        expect(finnishBusinessIds.isValidVatNumber(vatNumber)).to.equal(true)
      })
    })

  })

  describe('#generateBusinessId', () => {
    it('Should create valid random business ID with a sample of 10000', () => {
      for (let i = 0; i < 10000; i++) {
        const generated = finnishBusinessIds.generateBusinessId()
        expect(finnishBusinessIds.isValidBusinessId(generated)).to.equal(true)
      }
    })
  })

  describe('#generateVatNumber', () => {
    it('Should create valid random vat number with a sample of 10000', () => {
      for (let i = 0; i < 10000; i++) {
        const generated = finnishBusinessIds.generateVatNumber()
        expect(finnishBusinessIds.isValidVatNumber(generated)).to.equal(true)
      }
    })
  })

})
