import './UserWrapper.scss'
import { useNavigate } from 'react-router-dom'
import { deleteUser } from 'store/userSlice'
import { useAppDispatch } from 'store/hooks'
import { deleteReq } from 'utils/api-requests'
import { IUser } from '../UserInterface'
import { useLoadingContext } from 'context/LoadingContext'
import { setModal } from 'store/modalSlice'

const UserWrapper = ({ data }: { data: IUser }) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { offLoading, onLoading } = useLoadingContext()
    const deleteHandler = async () => {
        try {
            onLoading()
            const req = await deleteReq({ url: `/${data.id}` })
            if (req.status == 200) {
                return dispatch(deleteUser(data))
            }
        } catch (error) {
            console.log(error)
        } finally {
            offLoading()
            dispatch(setModal({
                open: false,
                title: '',
                children: '',
                successCb: () => { }
            }))
        }
    }

    const onDelete = () => {
        dispatch(setModal({
            title: 'Confirmation',
            children: 'Are you sure you want to delete this user ?',
            open: true,
            successCb: deleteHandler
        }))
    }

    return (
        <div className='user-card'>
            <div className='user-wrapper d-flex-sb'>
                <div className='d-flex'>
                    <div className='avatar'><img src={data.image} /></div>
                    <div className='info ml-32 d-fc'>
                        <div className='d-flex-wrap'>
                            <p>{data.firstName}</p>
                            <p className='ml-4'>{data.lastName}</p>
                        </div>
                        <div className='mt--20 fs-14'>
                            <p>{data.company?.title}</p>
                        </div>
                    </div>
                </div>
                <div>
                    <button className='btn edit' onClick={() => {
                        navigate(`/edit/${data.id}`)
                    }}>Edit</button>
                    <button className='btn cancel mt-8' onClick={onDelete}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UserWrapper
