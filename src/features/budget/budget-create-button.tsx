import { Button, ButtonProps } from '@material-ui/core'
import React from 'react'
import { useDispatch } from 'react-redux'
import { createBudget } from './budget-slice'

type BudgetCreateButtonProps = ButtonProps

export const BudgetCreateButton = (props: BudgetCreateButtonProps) => {
  const dispatch = useDispatch()

  const onCreateBudget = () => {
    dispatch(createBudget('Temp Budget'))
  }
  return (
    <Button {...props} onClick={onCreateBudget}>
      Add Budget
    </Button>
  )
}
