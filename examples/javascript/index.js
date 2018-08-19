const { FinnishBusinessIds } = require('finnish-business-ids')

const validId = FinnishBusinessIds.isValidBusinessId('2617416-4')
console.log('validId:', validId)

const validVat = FinnishBusinessIds.isValidVatNumber('FI26174164')
console.log('validVat:', validVat)

const businessId = FinnishBusinessIds.generateBusinessId()
console.log('businessId:', businessId)

const businessVat = FinnishBusinessIds.generateVatNumber()
console.log('vatNumber:', businessVat)

const checksum = FinnishBusinessIds.calculateChecksum('2617416')
console.log('checksum:', checksum)

