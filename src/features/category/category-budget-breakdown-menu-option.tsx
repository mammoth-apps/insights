import type { IBudget } from '@mammoth-apps/api-interfaces'
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { AssessmentOutlined } from '@material-ui/icons'
import React from 'react'
import { InsightRoute } from '../../router/routes'
import { useRouter } from '../../router/useRouter'
import { replaceKeyPlaceholders } from '../../utils'

interface IBudgetViewRouteProps {
  selectedBudget: IBudget
}

export const CategoryBudgetBreakdownMenuOption = ({
  selectedBudget,
}: IBudgetViewRouteProps) => {
  const router = useRouter()

  const onItemClick = () => {
    router.push(
      replaceKeyPlaceholders(InsightRoute.CategoryBreakdownPage, {
        budgetId: selectedBudget.id,
      }),
    )
  }

  return (
    <ListItem button key={'View Budget'} onClick={onItemClick}>
      <ListItemIcon>
        <AssessmentOutlined />
      </ListItemIcon>
      <ListItemText primary="View Budget" />
    </ListItem>
  )
}
