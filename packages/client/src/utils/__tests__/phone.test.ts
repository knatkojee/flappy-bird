import { formatPhone, cleanPhone } from '../phone'

describe('formatPhone', () => {
  it('returns empty string for empty input', () => {
    expect(formatPhone('')).toBe('')
  })

  it('formats single digit', () => {
    expect(formatPhone('7')).toBe('+7 (7')
  })

  it('formats up to 4 digits', () => {
    expect(formatPhone('7123')).toBe('+7 (123)')
  })

  it('formats up to 7 digits', () => {
    expect(formatPhone('71234567')).toBe('+7 (123) 456-7-')
  })

  it('formats full phone number', () => {
    expect(formatPhone('71234567890')).toBe('+7 (123) 456-78-90')
  })

  it('removes non-digit characters', () => {
    expect(formatPhone('+7 (123) 456-78-90')).toBe('+7 (123) 456-78-90')
  })
})

describe('cleanPhone', () => {
  it('removes all non-digit characters', () => {
    expect(cleanPhone('+7 (123) 456-78-90')).toBe('71234567890')
  })

  it('limits to 11 digits', () => {
    expect(cleanPhone('712345678901234')).toBe('71234567890')
  })

  it('handles empty string', () => {
    expect(cleanPhone('')).toBe('')
  })
})
