import type { IBudget } from '@mammoth-apps/api-interfaces'
import React from 'react'

type BudgetCardProps = IBudget & {
  onSelect: (id: string) => void
  onDelete: (id: string) => void
}

export const BudgetCard = ({
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
