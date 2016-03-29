'use strict'

import FinnishBusinessIds from '../src/finnish-business-ids'
import {expect} from 'chai'

describe('finnish-business-ids', () => {

  describe('#isValidBusinessId', () => {
    it('Should fail when given empty String', () => {
      expect(FinnishBusinessIds.isValidBusinessId('')).to.equal(false)
    })

    it('Should fail when given undefined', () => {
      expect(FinnishBusinessIds.isValidBusinessId(undefined)).to.equal(false)
    })

    it('Should fail when given null String', () => {
      expect(FinnishBusinessIds.isValidBusinessId(null)).to.equal(false)
    })

    it('Should fail when given too short business ID', () => {
      expect(FinnishBusinessIds.isValidBusinessId('261741-4')).to.equal(false)
    })

    it('Should fail when given too long business ID', () => {
      expect(FinnishBusinessIds.isValidBusinessId('2617416-44')).to.equal(false)
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
        expect(FinnishBusinessIds.isValidBusinessId(businessId)).to.equal(true)
      })
    })

  })

  describe('#isValidVatNumber', () => {
    it('Should fail when given empty String', () => {
      expect(FinnishBusinessIds.isValidVatNumber('')).to.equal(false)
    })

    it('Should fail when given undefined', () => {
      expect(FinnishBusinessIds.isValidVatNumber(undefined)).to.equal(false)
    })

    it('Should fail when given null String', () => {
      expect(FinnishBusinessIds.isValidVatNumber(null)).to.equal(false)
    })

    it('Should fail when given non String', () => {
      expect(FinnishBusinessIds.isValidVatNumber({})).to.equal(false)
      expect(FinnishBusinessIds.isValidVatNumber(Date())).to.equal(false)
      expect(FinnishBusinessIds.isValidVatNumber(3)).to.equal(false)
      expect(FinnishBusinessIds.isValidVatNumber(['a'])).to.equal(false)
      expect(FinnishBusinessIds.isValidVatNumber(NaN)).to.equal(false)
    })

    it('Should fail when given almost valid vat number nonsense in the end', () => {
      expect(FinnishBusinessIds.isValidVatNumber('FI26174164A')).to.equal(false)
    })

    it('Should fail when given almost valid vat number with nonsense in the beginning', () => {
      expect(FinnishBusinessIds.isValidVatNumber('AFI26174164')).to.equal(false)
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
        expect(FinnishBusinessIds.isValidVatNumber(vatNumber)).to.equal(true)
      })
    })

  })

  describe('#generateBusinessId', () => {
    it('Should create valid random business ID with a sample of 10000', () => {
      for (let i = 0; i < 10000; i++) {
        const generated = FinnishBusinessIds.generateBusinessId()
        expect(FinnishBusinessIds.isValidBusinessId(generated)).to.equal(true)
      }
    })
  })

  describe('#generateVatNumber', () => {
    it('Should create valid random vat number with a sample of 10000', () => {
      for (let i = 0; i < 10000; i++) {
        const generated = FinnishBusinessIds.generateVatNumber()
        expect(FinnishBusinessIds.isValidVatNumber(generated)).to.equal(true)
      }
    })
  })

})
