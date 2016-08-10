'use strict'

const BUSINESS_ID_REGEX = /^[\d]{7}-[\d]$/,
      VAT_NUMBER_REGEX = /^FI[\d]{8}$/,
      MULTIPLIERS = [7, 9, 10, 5, 8, 4, 2]

function randomBusinessIdWithoutChecksum() {
  let randomNumber = ''
  for (let i = 0; i < 7; i++) {
    randomNumber += Math.floor(Math.random() * 9) + 1 //  1...9, because a real number can't begin with zero
  }
  return randomNumber
}

const FinnishBusinessIds = {

  isValidBusinessId(businessId) {
    if (typeof businessId !== 'string' || !BUSINESS_ID_REGEX.test(businessId)) {
      return false
    }
    const givenChecksum = parseInt(businessId.substring(8,9), 10),
          idNumbers = businessId.substring(0, 7),
          calculatedChecksum = this.calculateChecksum(idNumbers)

    return calculatedChecksum === givenChecksum
  },

  isValidVatNumber(vatNumber) {
    if (typeof vatNumber !== 'string' || !VAT_NUMBER_REGEX.test(vatNumber)) {
      return false
    }
    const vatAsBusinessId = vatNumber.substring(2,9) + '-' + vatNumber.substring(9,10)
    return this.isValidBusinessId(vatAsBusinessId)
  },

  generateBusinessId() {
    const businessId = randomBusinessIdWithoutChecksum()
    const checksum = this.calculateChecksum((businessId))
    return businessId + '-' + checksum
  },

  generateVatNumber() {
    const countryCode = 'FI'
    const businessId = randomBusinessIdWithoutChecksum()
    const checksum = this.calculateChecksum((businessId))
    return countryCode + businessId + checksum
  },

  calculateChecksum(idNumbers) {
    let sum = 0
    for (let i = 0; i < idNumbers.length; i++) {
      sum += parseInt(idNumbers[i], 10) * MULTIPLIERS[i]
    }
    let remainder = sum % 11
    if (remainder > 1) {
      remainder = 11 - remainder
    }
    return remainder;
  }

}

module.exports = FinnishBusinessIds
