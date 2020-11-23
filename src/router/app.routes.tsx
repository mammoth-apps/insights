import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { CompanyDetailsPage, InsightDetailsPage } from '../features'
import { AuthenticatedRoute } from '../features/auth/AuthenticatedRoute'
import { Login } from '../features/login/Login'
import { RootPage } from '../features/pages/root-page'
import { ProtectedAppRoutes } from './app-protected.routes'
import { InsightRoute } from './routes'

// * TODO: Look into code splitting. Since the app doesn't need to load on mount it can wait until it's needed might be fun to try.

export const AppRoutes: React.FC<{}> = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={InsightRoute.Default} component={RootPage} />
        <Route exact path={InsightRoute.Login} component={Login} />
        <Route
          exact
          path={InsightRoute.Features}
          component={InsightDetailsPage}
        />
        <Route
          exact
          path={InsightRoute.Company}
          component={CompanyDetailsPage}
        />
        <AuthenticatedRoute
          path={InsightRoute.App}
          component={ProtectedAppRoutes}
        />
      </Switch>
    </BrowserRouter>
  )
}
