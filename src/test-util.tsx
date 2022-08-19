import React, { PropsWithChildren, ReactNode } from 'react'
import { render } from '@testing-library/react'
import type { RenderOptions } from '@testing-library/react'
import type { PreloadedState } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import setupStore from '/store'
import type { AppStore, RootState } from '/store/index'
import { LoadingProvider } from '/context/LoadingContext'

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>
  store?: AppStore
}

export * from '@testing-library/react'

export const renderWithRedux = (
  ui: React.ReactElement,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) => {
  const Wrapper = ({ children }: PropsWithChildren<{}>): JSX.Element => {
    return <Provider store={store}>
      <LoadingProvider>
        {children}
      </LoadingProvider>
    </Provider>
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}