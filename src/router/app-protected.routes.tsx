import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { withBudgetData } from '../features/hoc/withBudgetData'
import { BudgetSelectionPage } from '../features/pages/budget-selection-page'
import { InsightBudgetAppPage } from '../features/pages/insight-budget-app-routing'
import { InsightRoute } from './routes'

export const ProtectedAppRoutes: React.FC = (): JSX.Element => {
  return (
    <Switch>
      <Route exact path={InsightRoute.App} component={BudgetSelectionPage} />
      <Route
        path={InsightRoute.BudgetHub}
        component={withBudgetData(InsightBudgetAppPage)}
      />
    </Switch>
  )
}
