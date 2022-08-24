import { useEffect } from 'react'
import './UserList.scss'
import { useNavigate } from 'react-router-dom'
import { getUsers } from 'store/userSlice'
import { get } from 'utils/api-requests'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import UserWrapper from './UserWrapper/UserWrapper'
import { IUser } from './UserInterface'
import { useLoadingContext } from 'context/LoadingContext'

const UserList = () => {
    const { users } = useAppSelector(state => state.users)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const {onLoading, offLoading} = useLoadingContext()

    useEffect(() => {
        onLoading()
        const getData = async () => {
            try {
                if (users.length === 0 || users.length === 1) {
                    const res = await get({url: ''})
                    if (res.status === 200) {
                        return dispatch(getUsers(res.data.users))
                    }
                }
            } catch (error) {
                console.log(error)
            } finally {
                offLoading()
            }
        }
        getData()
    }, [users])

    return (
        <div className='list-container mt-32'>
            <button className='btn-create' onClick={() => {
                navigate('/create')
            }}>Create New User</button>
            <div className='list-wrapper'>
                {
                    users !== undefined && users.length !== 0 && users.map((item: IUser, idx) => (
                        <UserWrapper key={`${item.id}-${idx}`} data={item} />
                    ))
                }
            </div>
        </div>
    )
}

export default UserList