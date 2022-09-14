import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { hideToast } from 'store/toastSlice'
import './Toast.scss'

const notifyStatus = {
  success: '#5cb85c',
  error: '#d9534f'
};

const Toast = () => {
  const { notification } = useAppSelector(state => state.toast)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (notification) {
      const interval = setTimeout(() => {
        dispatch(hideToast());
      }, 3000);

      return () => {
        clearTimeout(interval);
      };
    }
  }, [notification, dispatch])

  const statusBg = notification ? notification.status : 'error'

  const content = (
    <div className={`toast-root ${notification ? 'active' : 'active out'}`}>
      <div className={`toast-container`} style={{ backgroundColor: notification?.status == 'success' || !notification ? 'rgba(49, 165, 49, 0.711)' : 'rgba(216, 8, 8, 0.855)' }}>
        {/* <button onClick={() => dispatch(hideToast())}>x</button> */}
        <div>{notification?.msg}</div>
      </div>
    </div>
  )
  return createPortal(content, document.getElementById('toast-root') as HTMLElement)
}

export default Toast