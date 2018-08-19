import { FinnishBusinessIds } from 'finnish-business-ids'

const validId: boolean = FinnishBusinessIds.isValidBusinessId('2617416-4')
console.log('validId:', validId)

const validVat: boolean = FinnishBusinessIds.isValidVatNumber('FI26174164')
console.log('validVat:', validVat)

const businessId: string = FinnishBusinessIds.generateBusinessId()
console.log('businessId:', businessId)

const businessVat: string = FinnishBusinessIds.generateVatNumber()
console.log('vatNumber:', businessVat)

const checksum: number = FinnishBusinessIds.calculateChecksum('2617416')
console.log('checksum:', checksum)

