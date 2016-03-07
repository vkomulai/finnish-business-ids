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

    it('Should fail when given too short refnumber (3 chars)', () => {
      expect(finnishBusinessIds.isValidBusinessId('123')).to.equal(false)
    })

    it('Should fail when given too long refnumber (21 chars)', () => {
      expect(finnishBusinessIds.isValidBusinessId('2617416-44')).to.equal(false)
    })

    it('Should pass when given valid refnumbers', () => {
      const validBusinessIds = ['2617416-4',
                          '2617416-4']
      validBusinessIds.forEach((businessId) => {
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

    it('Should fail when given almost valid bank number with nonsense in the end', () => {
      expect(finnishBusinessIds.isValidVatNumber('FI26174164A')).to.equal(false)
    })

    it('Should fail when given almost valid bank number with nonsense in the beginning', () => {
      expect(finnishBusinessIds.isValidVatNumber('AFI26174164')).to.equal(false)
    })

    it('Should pass when given valid vat number', () => {
      const validVatNumbers = ['FI26174164',
                               'FI26174164']
      validVatNumbers.forEach((vatNumber) => {
        expect(finnishBusinessIds.isValidVatNumber(vatNumber)).to.equal(true)
      })
    })

  })

  describe('#generateBusinessId', () => {
    it('Should create valid random reference number with a sample of 10000', () => {
      for (let i = 0; i < 10000; i++) {
        const generated = finnishBusinessIds.generateBusinessId()
        expect(finnishBusinessIds.isValidBusinessId(generated)).to.equal(true)
      }
    })
  })

  describe('#generateVatNumber', () => {
    it('Should create valid finnish IBAN number with a sample of 10000', () => {
      for (let i = 0; i < 10000; i++) {
        const generated = finnishBusinessIds.generateVatNumber()
        expect(finnishBusinessIds.isValidVatNumber(generated)).to.equal(true)
      }
    })
  })

})
