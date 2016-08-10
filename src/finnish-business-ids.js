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

function calculateChecksum(idNumbers) {
  let sum = 0
  for (let i = 0; i < idNumbers.length; i++) {
    sum += parseInt(idNumbers[i], 10) * MULTIPLIERS[i]
  }
  let remainder = sum % 11
  if (remainder > 1) {
    remainder = 11 - remainder
  }
  return remainder
}

export default class FinnishBusinessIds {

  static isValidBusinessId(businessId) {
    if (typeof businessId !== 'string' || !BUSINESS_ID_REGEX.test(businessId)) {
      return false
    }
    const givenChecksum = parseInt(businessId.substring(8,9), 10),
          idNumbers = businessId.substring(0, 7),
          calculatedChecksum = calculateChecksum(idNumbers)

    return calculatedChecksum === givenChecksum
  }

  static isValidVatNumber(vatNumber) {
    if (typeof vatNumber !== 'string' || !VAT_NUMBER_REGEX.test(vatNumber)) {
      return false
    }
    const vatAsBusinessId = vatNumber.substring(2,9) + '-' + vatNumber.substring(9,10)
    return this.isValidBusinessId(vatAsBusinessId)
  }

  static generateBusinessId() {
    const businessId = randomBusinessIdWithoutChecksum(),
          checksum = calculateChecksum((businessId))
    return businessId + '-' + checksum
  }

  static generateVatNumber() {
    const countryCode = 'FI',
          businessId = randomBusinessIdWithoutChecksum(),
          checksum = calculateChecksum((businessId))
    return countryCode + businessId + checksum
  }

}
