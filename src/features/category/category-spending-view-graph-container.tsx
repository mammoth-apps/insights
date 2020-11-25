import { Typography } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../../app'
import {
  getPastMonthTransactions,
  searchTransactionDateRange,
} from '../transactions/transaction-slice'
import { CategorySpendingViewGraph } from './category-spending-view-graph'

export const CategorySpendingViewGraphContainer = () => {
  // TODO: Enable this to support breakdown over a few different periods. Current Month, past 3 months, past 6 months
  const dispatch = useDispatch()
  const { pastMonthTransactions, budgetId } = useSelector(
    (state: RootState) => ({
      budgetId: state.budgets.selectedBudget!.id,
      pastMonthTransactions: getPastMonthTransactions(state.transactions),
    }),
  )

  useEffect(() => {
    const date = new Date()
    const isMonthNextYear = date.getMonth() + 2 > 12
    dispatch(
      searchTransactionDateRange(budgetId, {
        dayStart: 1,
        dayEnd: date.getDate(),
        monthStart: date.getMonth() + 1,
        monthEnd: !isMonthNextYear
          ? date.getMonth() + 2
          : (date.getMonth() + 2) % 12,
        yearStart: date.getFullYear(),
        yearEnd: !isMonthNextYear ? date.getFullYear() : date.getFullYear() + 1,
      }),
    )
  }, [])

  return (
    <section style={{ width: 600, height: 550 }}>
      <Typography variant="h4">Month Spend/Category</Typography>
      <CategorySpendingViewGraph transactions={pastMonthTransactions} />
    </section>
  )
}
