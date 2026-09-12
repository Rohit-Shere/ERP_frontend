export const storageService = {
  validateFile(file) {
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg']
    const maxSize = 5 * 1024 * 1024

    if (!file) return { valid: false, message: 'No file selected.' }
    if (!allowedTypes.includes(file.type)) {
      return { valid: false, message: 'Only PDF, JPG, JPEG, and PNG files are allowed.' }
    }
    if (file.size > maxSize) {
      return { valid: false, message: 'File must be smaller than 5MB.' }
    }

    return { valid: true }
  },

  formatFileSize(size) {
    if (size < 1024) return `${size} B`
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`
    return `${(size / (1024 * 1024)).toFixed(1)} MB`
  },
}
