import { Auth0Provider } from '@auth0/auth0-react'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './app/store'
import { ThemeProvider } from './components/theme/theme-provider'
import './index.css'
import { AppRoutes } from './router/app.routes'

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain={import.meta.env.SNOWPACK_PUBLIC_AUTH0_DOMAIN as string}
      clientId={import.meta.env.SNOWPACK_PUBLIC_AUTH0_CLIENT_ID as string}
      redirectUri={`${window.location.origin}/app`}
      audience="https://mammoth.api.com"
      cacheLocation="localstorage"
    >
      <ThemeProvider>
        <Provider store={store}>
          <AppRoutes />
        </Provider>
      </ThemeProvider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root'),
)

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/#hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept()
}
