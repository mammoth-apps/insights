import type { IBudget } from '@mammoth-apps/api-interfaces'
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { AssessmentOutlined } from '@material-ui/icons'
import React from 'react'

interface IBudgetReportsItemsProps {
  selectedBudget?: IBudget
}

export const BudgetReportsMenuOption = ({
  selectedBudget,
}: IBudgetReportsItemsProps) => {
  if (!selectedBudget) {
    return null
  }
  const onClick = () => {
    alert('Nothing here yet')
    // TODO: this will route to a reports page where different things can be viewed
  }

  return (
    <ListItem button key={'Reports'} onClick={onClick}>
      <ListItemIcon>
        <AssessmentOutlined />
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItem>
  )
}
