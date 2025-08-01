import { useEffect, useRef, useState } from 'react'
import Button from './Button'
import S from './FileUploader.module.css'
import supabase from '@/lib/supabaseClient'
import sanitizeFileName from '@/utils/sanitizeFileName'

interface FileList {
  name: string
  url: string
}

interface Props {
  onChange?: (fileList: FileList[]) => void
  value?: FileList[]
  error?: string
  className?: string
}

function FileUploader({ onChange, value = [], error, className }: Props) {
  const [fileList, setFileList] = useState<FileList[]>([])

  useEffect(() => {
    setFileList(value)
  }, [value])
  const fileInput = useRef<HTMLInputElement>(null)

  const handleClick = () => {
    fileInput.current?.click()
  }

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const uploaded: { name: string; url: string }[] = []

    for (const file of Array.from(files)) {
      const fileName = `file_${Date.now()}_${sanitizeFileName(file.name)}`

      const { error } = await supabase.storage
        .from('project-files')
        .upload(fileName, file)

      if (error) {
        console.error('업로드 실패', error)
      }

      const { data: urlData } = supabase.storage
        .from('project-files')
        .getPublicUrl(fileName)

      uploaded.push({ name: file.name, url: urlData.publicUrl })
    }

    const updatedList = [...fileList, ...uploaded]
    setFileList(updatedList)
    onChange?.(updatedList)

    if (fileInput.current) {
      fileInput.current.value = ''
    }
  }

  const handleDelete = async (index: number) => {
    const deleteFile = fileList[index]
    const url = new URL(deleteFile.url)
    const fileName = decodeURIComponent(url.pathname.split('/').pop() || '')

    const { error } = await supabase.storage
      .from('project-files')
      .remove([fileName])

    if (error) {
      alert('삭제가 실패되었음')
      console.error(error)

      return
    }

    const updatedList = [...fileList]
    updatedList.splice(index, 1)
    setFileList(updatedList)
    onChange?.(updatedList)
  }

  return (
    <div
      className={`${S['uploader']} ${error ? S['uploader-error'] : ''} ${className ?? ''}`}>
      <input
        type="file"
        ref={fileInput}
        onChange={handleChange}
        multiple
        className="a11y-hidden"
      />
      <p className={S['uploader__txt']}>첨부파일</p>
      <div className={S['uploader__cont']}>
        <ul className={S['uploader__fileList']}>
          {fileList.length === 0 && (
            <li className={S['notice']}>
              파일별 최대 10MB까지 업로드 가능합니다.
            </li>
          )}
          {fileList.map((file, index) => (
            <li key={index}>
              <a
                href={file.url}
                target="_blank"
                className={S['uploader__fileName']}>
                {file.name}
              </a>
              <button
                type="button"
                className={S['uploader__deleteBtn']}
                aria-label="삭제"
                onClick={() => handleDelete(index)}
              />
            </li>
          ))}
        </ul>
        <Button
          onClick={handleClick}
          className={S['uploader__btn']}>
          업로드
        </Button>
      </div>

      {error && <span className={'err-msg'}>{error}</span>}
    </div>
  )
}
export default FileUploader
