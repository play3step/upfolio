import type { AlertOptions } from '@/types/alert'
import Swal from 'sweetalert2'
import successIcon from '@/assets/icon/success.svg'
import errorIcon from '@/assets/icon/error.svg'
import warningIcon from '@/assets/icon/warning.svg'
import confirmIcon from '@/assets/icon/confirm.svg'

const ALERT_CLASS = (type: 'success' | 'error' | 'warning' | 'confirm') => ({
  popup: `swal-popup ${type}`,
  title: 'swal__title',
  content: 'swal__content',
  confirmButton: 'swal__confirmBtn',
  cancelButton: 'swal__cancelBtn',
  icon: 'swal__icon'
})

function insertIconHtml(iconUrl: string) {
  return `<img src="${iconUrl}" className='swal__icon' />`
}

// 성공 alert
export const alertSuccess = (options: AlertOptions = {}) => {
  const {
    title = '',
    text = '작업이 완료됨',
    confirmButtonText = '확인'
  } = options

  return Swal.fire({
    title,
    text,
    confirmButtonText,
    iconHtml: insertIconHtml(successIcon),
    icon: undefined,
    customClass: ALERT_CLASS('success')
  })
}

// 실패 alert
export const alertError = (options: AlertOptions = {}) => {
  const {
    title = '',
    text = '문제가 발생했습니다.',
    confirmButtonText = '닫기'
  } = options

  return Swal.fire({
    title,
    text,
    iconHtml: insertIconHtml(errorIcon),
    icon: undefined,
    confirmButtonText,
    customClass: ALERT_CLASS('error')
  })
}

// 경고 alert
export const alertWarning = (options: AlertOptions = {}) => {
  const {
    title = '',
    text = '확인해주세요.',
    confirmButtonText = '확인'
  } = options

  return Swal.fire({
    title,
    text,
    iconHtml: insertIconHtml(warningIcon),
    icon: undefined,
    confirmButtonText,
    customClass: ALERT_CLASS('warning')
  })
}

// 확인 alert
export const alertConfirm = async (options: AlertOptions = {}) => {
  const {
    title = '',
    text = '',
    confirmButtonText = '확인',
    cancelButtonText = '취소'
  } = options

  const result = await Swal.fire({
    title,
    text,
    iconHtml: insertIconHtml(confirmIcon),
    icon: undefined,
    showCancelButton: true,
    confirmButtonText,
    cancelButtonText,
    customClass: ALERT_CLASS('confirm')
  })

  return result.isConfirmed
}
