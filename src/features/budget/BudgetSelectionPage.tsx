import React, { useEffect } from 'react'
import type { IBudget } from '@mammoth-apps/api-interfaces'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../../app'
import { fetchBudgets, setBudget } from './budgetSlice'
import { logger } from '../../utils/logger'
import { useRouter } from '../../router/useRouter'
import { InsightRoute } from '../../router/routes'

type BudgetCardProps = IBudget & {
  onSelect: (id: string) => void
  onDelete: (id: string) => void
}

const BudgetCard = ({
  id,
  name,
  createdDate,
  onDelete,
  onSelect,
}: BudgetCardProps) => {
  return (
    <div className="w-1/2 bg-white rounded-lg p-6 border border-gray-300">
      <div className="text-center">
        <h2 className="text-lg font-bold">{name}</h2>
        <div className="text-purple-500">{createdDate}</div>
        <button className="btn btn-primary m-2" onClick={() => onSelect(id)}>
          Select
        </button>
        <button className="btn btn-delete m-2" onClick={() => onDelete(id)}>
          Delete
        </button>
      </div>
    </div>
  )
}

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
    </div>
  )
}
