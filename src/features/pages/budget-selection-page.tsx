import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../../app'
import { InsightRoute } from '../../router/routes'
import { useRouter } from '../../router/useRouter'
import { logger } from '../../utils/logger'
import { BudgetCard } from '../budget/budget-card'
import { BudgetCreateButton } from '../budget/budget-create-button'
import { fetchBudgets, setBudget } from '../budget/budget-slice'

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

  const onBudgetSelect = (id: string) => {
    const selectedBudget = budgetList.find((budget) => budget.id === id)
    if (selectedBudget) {
      dispatch(setBudget(selectedBudget))
      router.navigateTo(InsightRoute.BudgetHub, { budgetId: selectedBudget.id })
      return
    }
    logger.log('Invalid budget selected')
  }

  const onBudgetDelete = (id: string) => {}

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
