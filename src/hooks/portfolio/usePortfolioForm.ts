import type { PortfolioData, ValidationError } from '@/types/portfolio'

export const usePortfolioForm = (
  setPortfolioData: React.Dispatch<React.SetStateAction<PortfolioData>>,
  setErrors: React.Dispatch<React.SetStateAction<ValidationError>>
) => {
  const handleChangeForm = <K extends keyof PortfolioData>(
    key: K,
    value: PortfolioData[K]
  ) => {
    setPortfolioData(prev => ({
      ...prev,
      [key]: value
    }))

    setErrors(prevErrors => {
      const newErrors = { ...prevErrors }

      if (key === 'linkUrl' || key === 'fileList') {
        delete newErrors.linkUrl
        delete newErrors.fileList
      } else if (newErrors[key]) {
        delete newErrors[key]
      }
      return newErrors
    })
  }

  return { handleChangeForm }
}
