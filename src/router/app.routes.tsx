import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { BasePage } from '../features/base/BasePage'
import { AuthenticatedRoute } from '../features/auth/AuthenticatedRoute'
import { InsightRoute } from './routes'
import { Login } from '../features/login/Login'

export const AppRoutes: React.FC<{}> = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={InsightRoute.Default} component={BasePage} />
        <Route exact path={InsightRoute.Login} component={Login} />
        {/* <AuthenticatedRoute path={InsightRoute.App} component={ProtectedRoutes} /> */}
      </Switch>
    </BrowserRouter>
  )
}
