import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { InsightApp } from '../features/app/InsightApp'
import { BudgetSelectionPage } from '../features/budget/BudgetSelectionPage'
import { InsightRoute } from './routes'

export const ProtectedAppRoutes: React.FC = (): JSX.Element => {
  return (
    <Switch>
      <Route exact path={InsightRoute.App} component={BudgetSelectionPage} />
      <Route path={InsightRoute.BudgetHub} component={InsightApp} />
    </Switch>
  )
}
