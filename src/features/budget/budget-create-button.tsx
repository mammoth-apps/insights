import { Button, ButtonProps } from '@material-ui/core'
import React from 'react'

type BudgetCreateButtonProps = ButtonProps

export const BudgetCreateButton = (props: BudgetCreateButtonProps) => {
  const onCreateBudget = () => {}
  return (
    <Button {...props} onClick={onCreateBudget}>
      Add Budget
    </Button>
  )
}
