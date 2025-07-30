export const scrollToSection = (
    buttonName: string,
    ref: React.RefObject<HTMLDivElement>,
    setActiveButton: React.Dispatch<React.SetStateAction<string>>,
    duration: number = 200 // 기본 애니메이션 지속 시간
  ) => {
    setActiveButton(buttonName)

    if (ref.current) {
      const targetPosition = ref.current.offsetTop // 목표 위치
      const startPosition = window.scrollY /// 현재 스크롤 위치
      const distance = targetPosition - startPosition // 이동 거리
      let startTime: number | null = null

      const animation = (currentTime: number) => {
        if (startTime === null) startTime = currentTime // 시작 시간 설정
        const elapsedTime = currentTime - startTime // 경과 시간
        const progress = Math.min(elapsedTime / duration, 1) // 진행률 (0 ~ 1)

        // 부드러운 스크롤을 위한 ease-in-out 함수
        const easeInOutQuad = (t: number) =>
          t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2

        const scrollAmount = easeInOutQuad(progress) * distance + startPosition
        window.scrollTo(0, scrollAmount) // 스크롤 이동

        if (progress < 1) {
          window.requestAnimationFrame(animation) // 애니메이션 계속
        }
      }

      window.requestAnimationFrame(animation) // 애니메이션 시작
    }
  }
