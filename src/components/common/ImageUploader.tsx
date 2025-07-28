import { useEffect, useRef, useState } from 'react'
import defaultProfile from '../../assets/images/default-profile.png'
import S from './ImageUploader.module.css'

interface Props {
  id: string
}

function ImageUploader({ id }: Props) {
  const [imageSrc, setImageSrc] = useState('')

  const fileInput = useRef<HTMLInputElement>(null)

  const handleAddImage = () => {
    console.log('버튼 클릭')
    fileInput.current?.click()
  }

  const handleDeleteImage = () => {
    const check = confirm('등록한 이미지를 삭제하시겠습니까?')
    if (!check) return

    setImageSrc('')
    fileInput.current!.value = ''
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (!file) return

    const imageURL = URL.createObjectURL(file)

    setImageSrc(imageURL)
  }

  useEffect(() => {
    //이 안 코드: 컴포넌트가 mount 되거나 의존성 바뀔 때 실행

    return () => {
      // useEffect 안에서 return은 clean-up 함수 역할
      // 이 안 코드: 컴포넌트가 unmount or 의존성 바꾸기 직전에 실행

      // 임시 url 만든걸 메모리 해제해야함 안그러면 누수생김
      URL.revokeObjectURL(imageSrc)
    }
  }, [imageSrc])

  return (
    <div className={S['img-uploader']}>
      <div className={S['img__profile']}>
        <img
          src={imageSrc ? imageSrc : defaultProfile}
          alt="00님의 포트폴리오 프로필"
        />
      </div>
      <input
        id={id}
        type="file"
        ref={fileInput}
        accept="image/*"
        onChange={handleChange}
        className="a11y-hidden"
      />
      <button
        type="button"
        onClick={handleAddImage}
        className={S['img__addBtn']}
        aria-label="포트폴리오 프로필 이미지 업로드"
      />
      {imageSrc ? (
        <button
          type="button"
          onClick={handleDeleteImage}
          className={S['img__deleteBtn']}
          aria-label="기본 이미지로 변경"
        />
      ) : (
        ''
      )}
    </div>
  )
}
export default ImageUploader
