import React from 'react'
import { CategorySpendingViewGraphContainer } from '../category/category-spending-view-graph-container'
import { DynamicIncomeVsExpenseGraph } from '../graphs/dynamic-income-vs-expense-graph'
import { IncomeVsExpenseGraph } from '../graphs/income-vs-expense-graph'
import { NetWorthGraph } from '../graphs/net-worth-graph'
import { TransactionUpcomingList } from '../transactions/transaction-upcoming-list'
import './insight-budget-home-page.css'

export const InsightBudgetHomePage = () => {
  return (
    <article>
      <div className="flex-row">
        <CategorySpendingViewGraphContainer />
        <TransactionUpcomingList />
      </div>
      <div className="flex-row">
        <NetWorthGraph />
      </div>
      <div className="flex-row">
        <IncomeVsExpenseGraph />
        <DynamicIncomeVsExpenseGraph />
      </div>
    </article>
  )
}
