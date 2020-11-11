import React, { useEffect } from 'react'
import type { IBudget } from '@mammoth-apps/api-interfaces'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../../app'
import { fetchBudgets, setBudget } from './budgetSlice'
import { logger } from '../../utils/logger'

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
    <div className="md:flex bg-white rounded-lg p-6 border border-gray-300">
      <div className="text-center md:text-left">
        <h2 className="text-lg">{name}</h2>
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
  const { budgetList } = useSelector((state: RootState) => state.budgets)

  useEffect(() => {
    dispatch(fetchBudgets())
  }, [dispatch])

  // Hooks End

  const onBudgetSelect = (id: string) => {
    const selectedBudget = budgetList.find((budget) => budget.id === id)
    if (selectedBudget) {
      dispatch(setBudget(selectedBudget))
      // TODO: Navigate to the app/<budgetId> route.
    }
    logger.log('Invalid budget selected')
  }

  const onBudgetDelete = (id: string) => {}

  return (
    <div>
      {budgetList.map((budget) => (
        <BudgetCard
          key={budget.id}
          onDelete={onBudgetDelete}
          onSelect={onBudgetSelect}
          {...budget}
        />
      ))}
    </div>
  )
}
