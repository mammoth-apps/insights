import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { InsightRoute } from '../../router/routes'
import { AccountMenuOptions } from '../accounts'
import { InsightAppPageLayout } from '../app/InsightAppPageLayout'
import { BudgetMenuOptions } from '../budget'
import { AccountTransactionsPage } from './account-transactions-page'
import { CategoryBreakdownPage } from './category-breakdown-page'
import { InsightBudgetHomePage } from './insight-budget-home-page'
import { TransactionsPage } from './transactions-page'

export const InsightBudgetAppPage = () => {
  return (
    <InsightAppPageLayout
      budgetListConfig={<BudgetMenuOptions />}
      accountListConfig={<AccountMenuOptions />}
      content={
        <Switch>
          <Route
            exact
            path={InsightRoute.BudgetHub}
            component={InsightBudgetHomePage}
          />
          <Route
            path={InsightRoute.CategoryBreakdownPage}
            component={CategoryBreakdownPage}
          />
          <Route
            path={InsightRoute.AccountTransactionsPage}
            component={AccountTransactionsPage}
          />
          <Route
            path={InsightRoute.TransactionsPage}
            component={TransactionsPage}
          />
        </Switch>
      }
    />
  )
}
