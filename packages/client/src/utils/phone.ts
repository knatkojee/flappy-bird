export const formatPhone = (value: string) => {
  const cleaned = value.replace(/\D/g, '')
  if (cleaned.length === 0) return ''
  if (cleaned.length <= 1) return `+7 (${cleaned}`
  if (cleaned.length <= 4) return `+7 (${cleaned.slice(1)})`
  if (cleaned.length <= 7)
    return `+7 (${cleaned.slice(1, 4)}) ${cleaned.slice(4)}`
  return `+7 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(
    7,
    9
  )}-${cleaned.slice(9, 11)}`
}

export const cleanPhone = (phone: string) => {
  return phone.replace(/\D/g, '').slice(0, 11)
}
