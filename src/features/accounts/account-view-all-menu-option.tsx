import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { ListOutlined } from '@material-ui/icons'
import React, { useCallback } from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from '../../app'
import { InsightRoute } from '../../router/routes'
import { useRouter } from '../../router/useRouter'
import { replaceKeyPlaceholders } from '../../utils'

export const AccountViewAllMenuOption = (): JSX.Element => {
  const router = useRouter()
  const { selectedBudget } = useSelector(
    (rootState: RootState) => rootState.budgets,
  )

  const onClick = useCallback(() => {
    router.push(
      replaceKeyPlaceholders(InsightRoute.TransactionsPage, {
        budgetId: selectedBudget?.id,
      }),
    )
  }, [router, selectedBudget?.id])

  return (
    <ListItem button key={'View All Accounts'} onClick={onClick}>
      <ListItemIcon>
        <ListOutlined />
      </ListItemIcon>
      <ListItemText primary="View All Accounts" />
    </ListItem>
  )
}
