import './Modal.scss'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import PortalContainer from '../Portal/Portal'
import { setModal } from 'store/modalSlice'
import { createPortal } from 'react-dom'

const Modal = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { children, open, title, successCb } = useAppSelector(state => state.modal)

  const closeHandler = () => {
    dispatch(setModal({
      open: false,
      title: '',
      children: '',
      successCb: () => { }
    }))
  }

  const content = (
    <div className={`modal-container ${open ? 'active' : 'active out'}`}>
      <div className='modal-background'>
        <div className="modal">
          <div className="modal-header">
            <div className='d-flex-sb'>
              <h3>{title}</h3>
              <button className='btn-close' onClick={closeHandler}>X</button>
            </div>
          </div>
          <div className='modal-content'>
            {children}
          </div>
          <div className="modal-actions">
            <div className="action-container">
              <button className='btn cancel' onClick={closeHandler}>cancel</button>
              <button className='btn submit' onClick={successCb}>OK</button>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
  return createPortal(content, document.getElementById('modal-root') as HTMLElement);
}

export default Modal