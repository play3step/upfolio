import Button from '@/components/common/Button'
import CheckboxSelect from '@/components/common/CheckboxSelect'
import ImageUploader from '@/components/common/ImageUploader'
import { useEffect, useState } from 'react'
import S from './Profile.module.css'
import RadioGroup from '@/components/common/RadioGroup'
import supabase from '@/lib/supabaseClient'

export default function Profile() {
  const [selectedTechStack, setSelectedTechStack] = useState<string[]>([])
  const [interest, setInterest] = useState<string>('')
  const [data, setData] = useState<{ nickname: string } | null>(null)

  const handleCheckboxChange = (selectedItems: string[]) => {
    setSelectedTechStack(selectedItems)
  }

  const handleInterestChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInterest(e.target.value)
  }

  useEffect(() => {
    const fetchData = async () => {
      const { data: user, error: userError } = await supabase.auth.getUser()
      if (userError || !user) {
        console.error('사용자 인증 정보가 없습니다.')
        return
      }
      const { data: profile } = await supabase
        .from('User')
        .select('nickname')
        .eq('id', user.user.id)
        .single()

      setData(profile)
    }
    fetchData()
  }, [])

  return (
    <div className={S.profile}>
      <div className={S.profile__content}>
        <div className={S.profile__title}>
          <h1>내 프로필</h1>
          <div className={S.profile__btnWrap}>
            <Button>프로필 수정</Button>
          </div>
        </div>
        <div className={S.profile__imageSection}>
          <ImageUploader id="profile-image" />
          <p className={S.profile__greeting}>
            안녕하세요, <strong>{data?.nickname}</strong>님 <br />
            오늘도 파이팅하세요!
          </p>
        </div>
        <hr className={S.profile__divider} />
        <RadioGroup
          label="지원분야"
          name="fieldOfSupport"
          options={[
            { label: '프론트엔드 개발자', value: 'frontend' },
            { label: '백엔드 개발자', value: 'backend' },
            { label: '모바일 개발자', value: 'design' },
            { label: '데이터 엔지니어', value: 'data_engineer' },
            { label: '웹 디자이너', value: 'web_designer' },
            { label: '게임 개발자', value: 'game_developer' },
            { label: 'AI 엔지니어', value: 'ai_engineer' },
            { label: 'DevOps 엔지니어', value: 'devops_engineer' },
            { label: 'QA 엔지니어', value: 'qa_engineer' },
            { label: '기타', value: 'etc' }
          ]}
          checked={interest || ''}
          onChange={handleInterestChange}
          className={S.profile__radioGroup}
        />
        <div className={S.profile__checkbox}>
          <p>{selectedTechStack.join(' | ') || '선택된 항목이 없습니다.'}</p>
          <CheckboxSelect onChange={handleCheckboxChange} />
        </div>
      </div>
    </div>
  )
}
