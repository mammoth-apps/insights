import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../../app'
import { InsightRoute } from '../../router/routes'
import { useRouter } from '../../router/useRouter'
import { BudgetCard } from '../budget/budget-card'
import { BudgetCreateButton } from '../budget/budget-create-button'
import { deleteBudget, fetchBudgets, setBudget } from '../budget/budget-slice'

interface BudgetSelectionPageProps {}
export const BudgetSelectionPage: React.FC<BudgetSelectionPageProps> = ({}): JSX.Element => {
  // Hooks Begin
  const dispatch = useDispatch()
  const router = useRouter()
  const { budgetList } = useSelector((state: RootState) => state.budgets)

  useEffect(() => {
    dispatch(fetchBudgets())
  }, [dispatch])

  // Hooks End

  const onBudgetSelect = (budgetId: string) => {
    dispatch(setBudget(budgetId))
    router.navigateTo(InsightRoute.BudgetHub, { budgetId })
  }

  const onBudgetDelete = (id: string) => {
    dispatch(deleteBudget(id))
  }

  return (
    <div className="m-2">
      <h1 className="tracking-tight leading-10 font-extrabold text-gray-900 sm:text-4xl sm:leading-none md:text-5xl mb-4">
        Select your budget
      </h1>
      <div className="flex mb-2">
        {budgetList.map((budget) => (
          <BudgetCard
            key={budget.id}
            onDelete={onBudgetDelete}
            onSelect={onBudgetSelect}
            {...budget}
          />
        ))}
      </div>
      <BudgetCreateButton color="primary" />
    </div>
  )
}
