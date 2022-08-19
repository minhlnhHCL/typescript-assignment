import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import Loading from "../components/Loading/Loading";

export interface ILoading {
    onLoading: () => void,
    offLoading: () => void
}

const contextDefaultValues: ILoading = {
    onLoading: () => { },
    offLoading: () => { }
}
const LoadingContext = createContext<ILoading>(contextDefaultValues)

type Props = {
    children: ReactNode
}

const LoadingProvider = ({ children }: Props) => {
    const [isLoading, setIsLoading] = useState(false)
    const onLoading = () => setIsLoading(true)
    const offLoading = () => setIsLoading(false)

    return (
        <LoadingContext.Provider value={{ onLoading, offLoading }}>
            <>
                {isLoading && <Loading />}
                {children}
            </>
        </LoadingContext.Provider>
    )
}

export const useLoadingContext = () => useContext(LoadingContext)

export { LoadingContext, LoadingProvider }