export const formatDate = (dateString: string): string => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('ko-KR').replace(/\.\s*$/, '')
}
