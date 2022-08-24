import React, { FormEvent, useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { addUser, editUser } from '../../store/userSlice'
import './Form.scss'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { put, post, get } from 'utils/api-requests'
import { ActionCreatorWithPayload } from '@reduxjs/toolkit'
import { IUser } from '../User/UserInterface'
import { useLoadingContext } from 'context/LoadingContext'

const Form = () => {
    //Declare initial values
    const { users } = useAppSelector(state => state.users)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { userId } = useParams()
    const { onLoading, offLoading } = useLoadingContext()

    const [data, setData] = useState<IUser>({
        id: 0,
        firstName: '',
        lastName: '',
        image: '',
        age: 0,
        company: {
            title: ''
        }
    })

    useEffect(() => {
        const fetchUser = async () => {
            onLoading()
            try {
                const res = await get({ url: `/${userId}` })
                setData(res.data as IUser)
            } catch (error) {
                console.log(error)
            } finally {
                offLoading()
            }
        }
        if (userId)
            fetchUser()
    }, [])

    //Form Functions
    const successHandler = (res: any, reducer: ActionCreatorWithPayload<IUser, string>) => {
        offLoading()
        dispatch(reducer(res.data))
        navigate('/')
    }

    const onSubmit = async (event: FormEvent) => {
        event.preventDefault()
        onLoading()
        try {
            let url = '/add'
            if (userId) {
                url = `/${userId}`
                const req = await put({ url: url, body: data })
                return successHandler(req, editUser)

            }
            const newId = users.length == 0 ? 31 : 32
            data.id = newId
            data.image = 'https://robohash.org/hicveldicta.png'
            const newRes = { data: data }
            await post({ url: url, body: data })
            return successHandler(newRes, addUser)


        } catch (error) {
            offLoading()
            console.log(error)
        }
    }

    return (
        <div className='form-wrapper'>
            <form onSubmit={onSubmit} className='form'>
                <div className='d-flex-ac'>
                    <label htmlFor='firstName' className='custom-label'>First Name</label>
                    <input id='firstName' className='custom-input ' placeholder='First Name' name='firstName' value={data.firstName} onChange={(e) => setData({ ...data, firstName: e.target.value })} />
                </div>
                <div className='d-flex-ac mt-32'>
                    <label htmlFor='lastName' className='custom-label'>Last Name</label>
                    <input id='lastName' className='custom-input' placeholder='Last Name' name='lastName' value={data.lastName} onChange={(e) => setData({ ...data, lastName: e.target.value })} />
                </div>
                <div className='d-flex-ac mt-32'>
                    <label htmlFor='companyTitle' className='custom-label'>Company Title</label>
                    <input id='companyTitle' className='custom-input' placeholder='Company Title' name='companyTitle' value={data.company?.title} onChange={(e) => setData({ ...data, company: { ...data.company, title: e.target.value } })} />
                </div>

                <div className='form-actions'>
                    <div className="action-container">
                        <button className='btn cancel' type='button' onClick={() => {
                            navigate('/')
                        }}>
                            Cancel
                        </button>
                        <button aria-label='submit' name='btn-submit' className='btn submit' disabled={!(data.firstName && data.lastName && data.company?.title)} type='submit'>Submit</button>
                    </div>
                </div>
            </form >
        </div>
    )
}

export default Form