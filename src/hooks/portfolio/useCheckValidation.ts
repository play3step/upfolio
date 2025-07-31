import type { PortfolioData, ValidationError } from '@/types/portfolio'
import { useState } from 'react'

export const useCheckValidation = () => {
  const [errors, setErrors] = useState<ValidationError>({})

  /* --- error 체크 --- */
  const validate = (portfolioData: PortfolioData) => {
    const newErrors: ValidationError = {}

    if (!portfolioData.title.trim()) newErrors.title = '제목을 입력해주세요.'
    if (!portfolioData.career.value)
      newErrors.career = '경력수준을 선택해주세요.'
    if (!portfolioData.interest.value)
      newErrors.interest = '지원분야를 선택해주세요.'
    if (portfolioData.techStack.length === 0)
      newErrors.techStack = '기술스택을 선택해주세요.'
    if (!portfolioData.content.trim())
      newErrors.content = '소개를 입력해주세요.'
    if (!portfolioData.linkUrl.trim() && portfolioData.fileList.length === 0)
      newErrors.linkUrl = 'URL 또는 파일 첨부 중 하나는 반드시 입력해주세요.'

    setErrors(newErrors)

    return Object.keys(newErrors).length == 0
  }

  return { validate, errors, setErrors }
}
