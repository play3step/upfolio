import Button from '@/components/common/Button'

export default function ProfileButton({
  children,
  onClick,
  line = false
}: {
  children: React.ReactNode
  onClick: () => void
  line?: boolean
}) {
  return (
    <Button
      onClick={onClick}
      line={line}>
      {children}
    </Button>
  )
}
