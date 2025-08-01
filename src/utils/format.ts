const formatPhoneNumber = (value: string) => {
  const numbers = value.replace(/[^\d]/g, '')

  // 길이에 따라 하이픈 추가
  if (numbers.length <= 3) {
    return numbers
  } else if (numbers.length <= 7) {
    return numbers.slice(0, 3) + '-' + numbers.slice(3)
  } else {
    return (
      numbers.slice(0, 3) +
      '-' +
      numbers.slice(3, 7) +
      '-' +
      numbers.slice(7, 11)
    )
  }
}

const formatDate = (dateString: string): string => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('ko-KR').replace(/\.\s*$/, '')
}

export const formatTime = (timestamp: string) => {
  const date = new Date(timestamp)
  return date.toLocaleString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
}

export { formatPhoneNumber, formatDate }
