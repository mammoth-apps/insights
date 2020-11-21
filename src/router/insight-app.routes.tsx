import React from 'react'
import { useSelector } from 'react-redux'
import { InsightAppPageLayout } from '../features/app/InsightAppPageLayout'
import { withBudgetData } from '../features/hoc/withBudgetData'
import type { RootState } from '../app'
import { InsightRoute } from './routes'
import { Switch, Route } from 'react-router-dom'

export const BudgetRouter = () => {
  const budgetState = useSelector((state: RootState) => state.budgets)

  return <div>In Progress below. </div>
  // return withBudgetData(
  //   <InsightAppPageLayout
  //     budgetListConfig={<BudgetMenuOptions />}
  //     accountListConfig={<AccountMenuOptions />}
  //     content={
  //       <Switch>
  //         <Route exact path={InsightRoute.BudgetHub} component={HubPage} />
  //         <Route
  //           path={InsightRoute.CategoryBreakdownPage}
  //           component={CategoryBreakdownPage}
  //         />
  //         <Route path={InsightRoute.AccountPage} component={AccountPage} />
  //         <Route
  //           path={InsightRoute.TransactionsPage}
  //           component={TransactionsPage}
  //         />
  //       </Switch>
  //     }
  //   />,
  // )
}
