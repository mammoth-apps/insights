import React, { ComponentType, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../../app'
import { InsightRoute } from '../../router/routes'
import { useRouter } from '../../router/useRouter'
import { fetchAccountList } from '../accounts/account-slice'
import { fetchCategoryList } from '../category/category-slice'
import { fetchPayeeList } from '../payee/payee-slice'

export const withBudgetData = (WrappedComponent: ComponentType) => (
  props: any,
) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const {
    isAccountsLoading,
    isCategoriesLoading,
    isPayeeLoading,
    budgetId,
  } = useSelector((state: RootState) => ({
    isAccountsLoading: state.accounts.loading,
    isCategoriesLoading: state.categories.loading,
    isPayeeLoading: state.payees.loading,
    budgetId: state.budgets.selectedBudget?.id,
  }))

  useEffect(() => {
    if (!budgetId) {
      router.push(InsightRoute.App)
    }
    if (budgetId) {
      dispatch(fetchAccountList(budgetId))
      dispatch(fetchPayeeList(budgetId))
      dispatch(fetchCategoryList(budgetId))
    }
  }, [])

  if (!budgetId) {
    return <div>No budget currently selected</div>
  }

  if (isAccountsLoading || isCategoriesLoading || isPayeeLoading) {
    return <div>Getting things ready...</div>
  }

  return <WrappedComponent />
}
