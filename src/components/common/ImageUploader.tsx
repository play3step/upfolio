import { useEffect, useRef, useState } from 'react'
import defaultProfile from '../../assets/images/default-profile.png'
import S from './ImageUploader.module.css'
import supabase from '@/lib/supabaseClient'
import sanitizeFileName from '@/utils/sanitizeFileName'
import { alertConfirm, alertError } from '@/utils/alertUtils'

interface Props {
  id: string
  value: string
  onChange?: (imageSrc: string) => void
  status?: 'profile' | 'portfolio'
}

function ImageUploader({ id, value, onChange, status = 'profile' }: Props) {
  const [imageSrc, setImageSrc] = useState('')

  const fileInput = useRef<HTMLInputElement>(null)

  const handleAddImage = () => {
    fileInput.current?.click()
  }

  const handleDeleteImage = async () => {
    if (!imageSrc) return
    const check = await alertConfirm({
      text: '등록한 이미지를 삭제할까요?'
    })
    if (!check) return
    try {
      const url = new URL(imageSrc)
      const fileName = url.pathname.split('/').pop() || ''

      if (fileName) {
        const { error } = await supabase.storage
          .from('project-images')
          .remove([fileName])

        if (error) {
          alertError({
            title: '이미지 삭제 실패',
            text: '다시 시도해 주세요.'
          })
          console.error(error)

          return
        }
      }
    } catch (error) {
      console.error(error)
    }

    onChange?.('')
    setImageSrc('')
    fileInput.current!.value = ''
  }

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const localUrl = URL.createObjectURL(file)
    setImageSrc(localUrl)
    const fileName = `${status}_${Date.now()}_${sanitizeFileName(file.name)}`

    const { error } = await supabase.storage
      .from('project-images')
      .upload(fileName, file, {
        upsert: true,
        metadata: { status }
      })

    if (error) {
      alertError({
        title: '이미지 등록 실패',
        text: '다시 시도해 주세요.'
      })
      console.error(error)
      return
    }

    e.target.value = ''

    const { data: urlData } = supabase.storage
      .from('project-images')
      .getPublicUrl(fileName)

    const publicUrl = urlData?.publicUrl ?? ''

    onChange?.(publicUrl)
    setImageSrc(publicUrl)
  }

  useEffect(() => {
    if (value) setImageSrc(value)
  }, [value])

  return (
    <div className={S['img-uploader']}>
      <div className={S['img__profile']}>
        <img
          src={imageSrc ? imageSrc : defaultProfile}
          alt=""
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
      {value ? (
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
