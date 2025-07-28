import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import supabase from '@/lib/supabaseClient'
import S from './EditProfile.module.css'

interface Draft {
  id: number
  title: string
  content: string
  updatedAt: string
}

export const EditProfile = () => {
  const [tempPortfolio, setTempPortfolio] = useState<Draft[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchTempPortfolio = async () => {
      try {
        const { data: user, error: userError } = await supabase.auth.getUser()
        if (userError || !user) {
          console.error('사용자 인증 정보가 없습니다.')
          return
        }

        const { data, error } = await supabase
          .from('TempPortfolio') // 임시 저장된 글이 저장된 테이블
          .select('id, title, content, updatedAt')
          .eq('userId', user.user.id)

        if (error) {
          console.error(
            '임시 저장된 글을 가져오는 중 오류 발생:',
            error.message
          )
          return
        }

        setTempPortfolio(data || [])
      } catch (err) {
        console.error('예기치 못한 오류 발생:', err)
      }
    }

    fetchTempPortfolio()
  }, [])

  // 임시 저장된 글을 수정하는 페이지로 이동 추후 수정
  function handleTempClick(id: number): void {
    navigate(`/write/${id}`)
  }

  return (
    <div className={S.container}>
      <h2 className={S.title}>임시 저장한 글</h2>
      {tempPortfolio.length === 0 ? (
        <p>임시 저장된 글이 없습니다.</p>
      ) : (
        <ul className={S.list}>
          {tempPortfolio.map(temp => (
            <li
              key={temp.id}
              className={S.item}
              onClick={() => handleTempClick(temp.id)}>
              <div className={S.content}>
                <h3 className={S.itemTitle}>{temp.title}</h3>
                <p className={S.itemDescription}>{temp.content}</p>
              </div>
              <div className={S.date}>
                {new Date(temp.updatedAt).toLocaleDateString()}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
