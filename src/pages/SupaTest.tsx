
// import { useAuthLogin } from '@/hooks/auth/useAuthLogin'
import { useState } from 'react'

function SupaTest() {
  // const { authData, handleSignIn, handleSignOut } = useAuthLogin()

  const [guildList, setGuildList] = useState<string[]>([])
  const [guildName, setGuildName] = useState('')

  const handleGuildKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addGuildList(guildName)
    }
  }

  const addGuildList = (guildName: string) => {
    setGuildList([...guildList, guildName])
    setGuildName('')
  }

  const removeGuildList = (guildName: string) => {
    setGuildList(guildList.filter(guild => guild !== guildName))
  }

  return (
    <>
      <div>
        {/* <button onClick={() => handleSignIn('google')}>구글 로그인</button>
        <button onClick={() => handleSignIn('github')}>깃허브 로그인</button>
        <button onClick={handleSignOut}>로그아웃</button>
        {authData && (
          <div>
            <p>이름: {authData.name}</p>
            <p>이메일: {authData.email}</p>
            <p>유저네임: {authData.user_name}</p>
            <p>
              아바타: {authData.avatar_url}
              <img
                src={authData.avatar_url}
                alt="avatar"
              />
            </p>
            <p>프로바이더: {authData.provider}</p>
          </div>
        )} */}
        <div className="md:col-span-2 md:w-2/3 md:mx-auto bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
          <div className="flex flex-col justify-between">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg flex items-center justify-center shadow-sm"></div>
              <h2 className="text-base font-semibold text-gray-800">
                길드 검색 (최대 4개 검색 가능)
              </h2>
            </div>
            <div className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="길드 이름을 입력하세요"
                  value={guildName}
                  onChange={e => setGuildName(e.target.value)}
                  onKeyPress={handleGuildKeyPress}
                  className="flex-1 px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
                />
                <button
                  onClick={() => addGuildList(guildName)}
                  className="px-4 py-2.5 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-sm transition-all shadow-sm">
                  추가
                </button>
              </div>

              <div className="space-y-1.5">
                <p className="text-xs text-gray-600">검색할 길드 목록</p>
                <div className="flex flex-wrap gap-1.5">
                  {guildList.map(guild => (
                    <div
                      key={guild}
                      className="flex items-center gap-1 px-2.5 py-1 bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200 rounded-md group">
                      <span className="text-sm text-purple-700">{guild}</span>
                      <button
                        onClick={() => removeGuildList(guild)}
                        className="p-0.5 text-purple-400 hover:text-purple-600 rounded-full hover:bg-purple-100 transition-colors">
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default SupaTest
