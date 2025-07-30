export const formatPhoneNumber = (value: string) => {
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
