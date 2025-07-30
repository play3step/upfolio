function sanitizeFileName(name: string) {
  return encodeURIComponent(name)
    .replace(/%20/g, '_')
    .replace(/[^a-zA-Z0-9_.-]/g, '')
}
export default sanitizeFileName
