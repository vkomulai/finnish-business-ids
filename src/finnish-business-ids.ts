const BUSINESS_ID_REGEX = /^[\d]{7}-[\d]$/
const VAT_NUMBER_REGEX = /^FI[\d]{8}$/
const MULTIPLIERS = [7, 9, 10, 5, 8, 4, 2]

function randomBusinessIdWithoutChecksum(): string {
  return (Math.floor(Math.random() * 1000000) + 1000000).toString()
}

export class FinnishBusinessIds {

  public static isValidBusinessId(businessId: string): boolean {
    if (!BUSINESS_ID_REGEX.test(businessId)) {
      return false
    }
    const givenChecksum = parseInt(businessId.substring(8,9), 10)
    const idNumbers = businessId.substring(0, 7)
    const calculatedChecksum = FinnishBusinessIds.calculateChecksum(idNumbers)
    
    return calculatedChecksum === givenChecksum
  }

  public static isValidVatNumber(vatNumber: string): boolean {
    if (!VAT_NUMBER_REGEX.test(vatNumber)) {
      return false
    }
    const vatAsBusinessId = `${vatNumber.substring(2,9)}-${vatNumber.substring(9,10)}`
   
    return this.isValidBusinessId(vatAsBusinessId)
  }

  public static generateBusinessId(): string {
    const businessId = randomBusinessIdWithoutChecksum()
    const checksum = FinnishBusinessIds.calculateChecksum(businessId)
    
    return `${businessId}-${checksum}`
  }

  public static generateVatNumber(): string {
    const countryCode = 'FI'
    const businessId = randomBusinessIdWithoutChecksum()
    const checksum = FinnishBusinessIds.calculateChecksum(businessId)
    
    return countryCode + businessId + checksum
  }

  public static calculateChecksum(idNumbers: string): number {
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
}
