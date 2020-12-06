import React, { ComponentType, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../../app'
import { InsightRoute } from '../../router/routes'
import { useRouter } from '../../router/useRouter'
import { fetchAccountList } from '../accounts/account-slice'
import { fetchCategoryList } from '../category/category-slice'
import { fetchPayeeList } from '../payee/payee-slice'

export const withBudgetData = (WrappedComponent: ComponentType) => (props: any) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { hasAccounts, hasCategories, hasPayees, budgetId } = useSelector((state: RootState) => ({
    hasAccounts: state.accounts.accounts.length > 0,
    hasCategories: state.categories.categories.length > 0,
    hasPayees: state.payees.payees.length > 0,
    budgetId: state.budgets.selectedBudget?.id,
  }))

  useEffect(() => {
    if (!budgetId) {
      router.push(InsightRoute.App)
    }
    if (budgetId) {
      // pre-loading some data, can't hold up the page or else nothing will render since you could have nothing to start.
      if (!hasAccounts) dispatch(fetchAccountList(budgetId))
      if (!hasCategories) dispatch(fetchPayeeList(budgetId))
      if (!hasPayees) dispatch(fetchCategoryList(budgetId))
    }
  }, [])

  if (!budgetId) {
    return <div>No budget currently selected</div>
  }

  return <WrappedComponent />
}
