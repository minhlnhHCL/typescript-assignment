import { lazy, Suspense } from 'react'
import { Provider } from 'react-redux'
import UserList from 'components/User/UserList'
import { LoadingProvider } from 'context/LoadingContext'
import store from './store'
import { Route, Routes } from 'react-router-dom'
import Loading from 'components/Loading/Loading'
import Form from './components/Form/Form'
import Modal from './components/common/Modal/Modal'


const App = () => {
    return (
        <Provider store={store()}>
            <LoadingProvider>
                <>
                    <Routes>
                        <Route path='/' element={<UserList />} />
                        <Route path='create' element={<Form />} />
                        <Route path='edit/:userId' element={<Form />} />
                    </Routes>
                    <Modal />
                </>
            </LoadingProvider>
        </Provider>
    )
}

export default App