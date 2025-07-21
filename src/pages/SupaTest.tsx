import supabase from "@/lib/supabaseClient"
import { useEffect, useState } from "react"

type UserData = {
  id: number
  email: string
  nickname: string
  profileimage: string
  interest: string
  createAt: string
}

function SupaTest() {

  const [userlist, setUserList] = useState<UserData[]>([])

  useEffect(() => {
    const fetchUserList = async () => {
      const { data, error } = await supabase
        .from('user')
        .select('*')

      if (!error && data) {
        console.log('연결 성공', data)
        setUserList(data)
      } else {
        console.error('연결 실패:', error?.message)
      }
    }

    fetchUserList()
  }, [])

  return (
    <div>
      <h2>사용자 목록 테스트 ㄱㅈㅇ!</h2>
      {
        userlist.map((user) => (
          <ul key={user.id}>
            <li>아이디 : { user.id }</li>
            <li>이메일 : { user.email }</li>
            <li>이름 : { user.nickname }</li>
            <li>프로필이미지 : { user.profileimage }</li>
            <li>관심사 : { user.interest }</li>
            <li>가입일 : { user.createAt }</li>
          </ul>
        ))
      }
    </div>
  )
}
export default SupaTest