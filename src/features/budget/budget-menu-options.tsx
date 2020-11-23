import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { HomeOutlined } from '@material-ui/icons'
import React from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from '../../app'
import { InsightRoute } from '../../router/routes'
import { useRouter } from '../../router/useRouter'
import { replaceKeyPlaceholders } from '../../utils'
import { AccountViewAllMenuOption } from '../accounts/account-view-all-menu-option'
import { CategoryBudgetBreakdownMenuOption } from '../category'
import { BudgetReportsMenuOption } from './budget-reports-menu-option'
import { BudgetSettingsItem } from './budget-settings-item'

export const BudgetMenuOptions = (): JSX.Element => {
  const { selectedBudget } = useSelector((state: RootState) => state.budgets)
  const router = useRouter()
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', flexWrap: 'nowrap' }}
    >
      <List>
        <BudgetSettingsItem selectedBudget={selectedBudget!} />
        <ListItem
          button
          key={'Home'}
          onClick={() =>
            router.push(
              replaceKeyPlaceholders(InsightRoute.BudgetHub, {
                budgetId: selectedBudget?.id,
              }),
            )
          }
        >
          <ListItemIcon>
            <HomeOutlined />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <CategoryBudgetBreakdownMenuOption selectedBudget={selectedBudget!} />
        <BudgetReportsMenuOption selectedBudget={selectedBudget!} />
        <AccountViewAllMenuOption />
      </List>
    </div>
  )
}
