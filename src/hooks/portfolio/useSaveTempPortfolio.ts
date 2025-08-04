import { uploadTempPortfolio } from '@/apis/portfolio/saveTemp.controller'
import type { PortfolioData, UserInfo } from '@/types/portfolio'
import { isEqual, omit } from 'lodash'

export const useSaveTempPortfolio = ({
  portfolioData,
  userInfo,
  onSave,
  setTempPortfolioId,
  tempPortfolioId,
  lastSavedDataRef
}: {
  portfolioData: PortfolioData
  userInfo: UserInfo | null
  onSave?: () => void
  setTempPortfolioId?: (id: string) => void
  tempPortfolioId?: string
  lastSavedDataRef?: React.MutableRefObject<Partial<PortfolioData | null>>
}) => {
  const handleSaveTemp = async () => {
    const omitFields = ['createdAt', 'viewCount', 'id', 'userId']
    const prevData = lastSavedDataRef?.current
      ? omit(lastSavedDataRef.current, omitFields)
      : null
    const currData = omit(portfolioData, omitFields)
    if (
      tempPortfolioId &&
      lastSavedDataRef?.current &&
      isEqual(prevData, currData)
    ) {
      alert('수정사항이 없습니다.')
      return
    }
    try {
      const tempData = {
        ...portfolioData,
        userId: userInfo?.id ?? portfolioData.userId,
        name: userInfo?.nickname ?? portfolioData.name,
        email: userInfo?.email ?? portfolioData.email,
        phone: userInfo?.phone ?? portfolioData.phone,
        birthDate: userInfo?.birthDate ?? portfolioData.birthDate,
        title:
          portfolioData.title.trim() === '' ? '제목없음' : portfolioData.title
      }
      const id = await uploadTempPortfolio({
        portfolioData: tempData,
        userInfo
      })
      alert(tempPortfolioId ? '수정되었습니다.' : '임시저장되었습니다.')

      if (setTempPortfolioId) {
        setTempPortfolioId(id)
      }
      if (lastSavedDataRef) {
        lastSavedDataRef.current = omit(tempData, ['createdAt', 'viewCount'])
        console.log('lastSavedDataRef after save:', lastSavedDataRef.current)
      }

      if (onSave) {
        onSave()
      }
    } catch (error) {
      alert('임시저장에 실패하였습니다. 다시 시도해주세요.')
      console.error(error)
    }
  }

  return { handleSaveTemp }
}
