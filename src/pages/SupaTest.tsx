
// import { useAuthLogin } from '@/hooks/auth/useAuthLogin'
import { useState } from 'react'

const AVAILABLE_GUILDS = [
  'Account Manager',
  'Recruiter',
  'Business Analyst',
  'Financial Advisor',
  'Account Executive',
  'Branch Manager',
  'Data Analyst',
  'Insurance Underwriter'
]

function SupaTest() {
  const [guildList, setGuildList] = useState<string[]>([])

  const toggleGuild = (guild: string) => {
    if (guildList.includes(guild)) {
      setGuildList(guildList.filter(g => g !== guild))
    } else if (guildList.length < 4) {
      setGuildList([...guildList, guild])
    }
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
                길드 선택 (최대 4개 선택 가능)
              </h2>
            </div>

            <div className="space-y-3">
              <div className="flex flex-wrap gap-2 min-h-[2rem] p-2 border border-gray-200 rounded-lg">
                {guildList.map(guild => (
                  <div
                    key={guild}
                    className="flex items-center gap-1 px-2.5 py-1 bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200 rounded-md">
                    <span className="text-sm text-purple-700">{guild}</span>
                    <button
                      onClick={() => toggleGuild(guild)}
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

              <div className="space-y-1.5">
                <p className="text-xs text-gray-600">선택 가능한 길드 목록</p>
                <div className="space-y-2">
                  {AVAILABLE_GUILDS.map(guild => (
                    <div
                      key={guild}
                      onClick={() => toggleGuild(guild)}
                      className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-all ${
                        guildList.includes(guild)
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 hover:border-purple-200 hover:bg-purple-50/50'
                      }`}>
                      <div
                        className={`w-5 h-5 rounded border flex items-center justify-center ${
                          guildList.includes(guild)
                            ? 'bg-purple-500 border-purple-500'
                            : 'border-gray-300'
                        }`}>
                        {guildList.includes(guild) && (
                          <svg
                            className="w-3 h-3 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </div>
                      <span className="text-sm text-gray-700">{guild}</span>
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
