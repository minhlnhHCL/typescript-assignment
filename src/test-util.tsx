import React, { PropsWithChildren, ReactNode } from 'react'
import { render } from '@testing-library/react'
import type { RenderOptions } from '@testing-library/react'
import type { PreloadedState } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import setupStore from 'store'
import type { AppStore, RootState } from 'store/index'
import { LoadingContext, LoadingProvider } from 'context/LoadingContext'
import { BrowserRouter } from 'react-router-dom'

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>
  store?: AppStore
  onLoading: () => void,
  offLoading: () => void,
}

export * from '@testing-library/react'

export const renderWithRedux = (
  ui: React.ReactElement,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    onLoading = () => { },
    offLoading = () => { },
    ...renderOptions
  }: ExtendedRenderOptions = { onLoading: () => { }, offLoading: () => { } }
) => {
  const Wrapper = ({ children }: PropsWithChildren<{}>): JSX.Element => {
    return <BrowserRouter>
      <Provider store={store}>
        <LoadingContext.Provider value={{ offLoading, onLoading }}>
          {children}
        </LoadingContext.Provider>
      </Provider></BrowserRouter>
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}