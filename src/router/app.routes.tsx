import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { BasePage } from '../features/base/BasePage'
import { InsightRoute } from './routes'
import { Login } from '../features/login/Login'
import { CompanyDetails, FeatureList } from '../features'

// * TODO: Look into code splitting. Since the app doesn't need to load on mount it can wait until it's needed might be fun to try.

export const AppRoutes: React.FC<{}> = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={InsightRoute.Default} component={BasePage} />
        <Route exact path={InsightRoute.Login} component={Login} />
        <Route exact path={InsightRoute.Features} component={FeatureList} />
        <Route exact path={InsightRoute.Company} component={CompanyDetails} />
        {/* <AuthenticatedRoute path={InsightRoute.App} component={ProtectedRoutes} /> */}
      </Switch>
    </BrowserRouter>
  )
}
