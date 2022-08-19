import './Modal.scss'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '/store/hooks'
import PortalContainer from '../Portal/Portal'
import { setModal } from '/store/modalSlice'

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

  return (
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
            <button onClick={closeHandler}>cancel</button>
            <button onClick={successCb}>OK</button>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Modal