import { lazy, Suspense } from 'react'
import { Provider } from 'react-redux'
// import UserList from 'components/User/UserList'
import { LoadingProvider } from 'context/LoadingContext'
import store from './store'
import { Route, Routes } from 'react-router-dom'
import Loading from 'components/Loading/Loading'
import Form from './components/Form/Form'
import Modal from './components/common/Modal/Modal'
import Toast from 'components/common/Toast/Toast'
import { BarChart, IData } from 'components/Chart/ChartLine'
import StyledComponent from 'components/StyledComponent/StyledComponent'
import D3Transition from 'components/Chart/D3Transition'
import D3DonutChart from 'components/Chart/D3DonutChart'

const UserList = lazy(() => import('components/User/UserList'))
// const ChartLine = lazy(() => import('components/Chart/ChartLine'))

const App = () => {
    return (
        <Provider store={store()}>
            <LoadingProvider>
                <>
                    <Routes>
                        <Route path='/' element={<Suspense fallback={<Loading />}><UserList /></Suspense>} />
                        <Route path='create' element={<Form />} />
                        <Route path='edit/:userId' element={<Form />} />
                        <Route path='/d3chart' element={<BarChart />} />
                        <Route path='/d3transition' element={<D3Transition />} />
                        <Route path='/d3donut' element={<D3DonutChart />} />
                        <Route path="/style" element={<StyledComponent />} />

                    </Routes>
                    <Modal />
                    <Toast />
                </>
            </LoadingProvider>
        </Provider>
    )
}

export default App