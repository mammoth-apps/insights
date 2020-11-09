import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../../app'
import { fetchBudgets } from './budgetSlice'

interface BudgetSelectionPageProps {}
export const BudgetSelectionPage: React.FC<BudgetSelectionPageProps> = ({}): JSX.Element => {
  const dispatch = useDispatch()

  const { budgetList } = useSelector((state: RootState) => state.budgets)
  console.log('Need to add the authorization token to this', budgetList)
  useEffect(() => {
    dispatch(fetchBudgets())
  }, [dispatch])

  return <div>Budget Selection Page</div>
}
