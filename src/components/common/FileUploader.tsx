import { useRef, useState } from 'react'
import Button from './Button'
import S from './FileUploader.module.css'
import Textarea from './Textarea'

interface Props {
  id: string
  onChange?: (fileNames: string[]) => void
}

function FileUploader({ id, onChange }: Props) {
  const [fileNames, setFileNames] = useState<string[]>([])

  const fileInput = useRef<HTMLInputElement>(null)

  const handleClick = () => {
    fileInput.current?.click()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files

    if (!files) return

    const names = Array.from(files).map(file => file.name)
    onChange?.(names)
    setFileNames(names)
  }

  return (
    <div className={S['uploader']}>
      <input
        type="file"
        ref={fileInput}
        onChange={handleChange}
        multiple
        className="a11y-hidden"
      />
      <Textarea
        id={id}
        label="파일첨부"
        value={fileNames.join('\n')}
        placeholder="파일별 최대 10MB까지 업로드 가능합니다."
        className={S['uploader__textarea']}
        readOnly
      />
      <Button
        onClick={handleClick}
        className={S['uploader__btn']}>
        업로드
      </Button>
    </div>
  )
}
export default FileUploader
