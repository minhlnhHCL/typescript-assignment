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

const UserList = lazy(() => import('components/User/UserList'))
// const ChartLine = lazy(() => import('components/Chart/ChartLine'))

const BAR_CHART_DATA: IData[] = [
    { label: "Apples", value: 100 },
    { label: "Bananas", value: 200 },
    { label: "Oranges", value: 50 },
    { label: "Kiwis", value: 150 },
    { label: "Mangoes", value: 40 },
    { label: "Guavas", value: 120 },
    { label: "Pears", value: 220 },
    { label: "Watermelons", value: 130 },
    { label: "Tomatoes", value: 240 },
    { label: "Strawberries", value: 150 },
    { label: "Jackfruits", value: 180 },
    { label: "Rambutans", value: 210 },
    { label: "Starfruit", value: 160 },
    { label: "Avocadoes", value: 100 },
    { label: "Durians", value: 150 },
    // { label: "Blueberries", value: 150 },
    // { label: "Blackberries", value: 150 },
    // { label: "Dragon fruit", value: 150 },
    // { label: "Papayas", value: 150 },
    // { label: "Plums", value: 150 },
    // { label: "Lychees", value: 150 },
    // { label: "Figs", value: 150 },
    // { label: "Apricots", value: 150 },
    // { label: "Pineapples", value: 150 },
    // { label: "Limes", value: 150 },
    // { label: "Peaches", value: 150 },
    // { label: "Pomegranates", value: 150 },
    // { label: "Tamarinds", value: 150 },
    // { label: "Melons", value: 150 },
    // { label: "Mulberries", value: 150 },
    // { label: "Gooseberries", value: 150 },
    // { label: "Sapodillas", value: 150 },
    // { label: "Cashews", value: 150 },
];

const App = () => {
    return (
        <Provider store={store()}>
            <LoadingProvider>
                <>
                    <Routes>
                        <Route path='/' element={<Suspense fallback={<Loading />}><UserList /></Suspense>} />
                        <Route path='create' element={<Form />} />
                        <Route path='edit/:userId' element={<Form />} />
                        <Route path='/bar-chart' element={<BarChart data={BAR_CHART_DATA} />} />
                    </Routes>
                    <Modal />
                    <Toast />
                </>
            </LoadingProvider>
        </Provider>
    )
}

export default App