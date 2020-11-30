import type { IAccount } from '@mammoth-apps/api-interfaces'
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { AccountBalanceOutlined } from '@material-ui/icons'
import React from 'react'
import { InsightRoute } from '../../router/routes'
import { useRouter } from '../../router/useRouter'
import { formatter, replaceKeyPlaceholders } from '../../utils'

type AccountMenuOptionsListItemProps = {
  details: IAccount
}

export const AccountMenuOptionsListItem = ({
  details,
}: AccountMenuOptionsListItemProps) => {
  const router = useRouter()

  const onAccountClick = () => {
    const { budgetId, id: accountId } = details
    router.push(
      replaceKeyPlaceholders(InsightRoute.AccountTransactionsPage, {
        budgetId,
        accountId,
      }),
    )
  }

  return (
    <ListItem alignItems="center" button onClick={onAccountClick}>
      <ListItemIcon>
        <AccountBalanceOutlined />
      </ListItemIcon>
      <ListItemText primary={details.name} />
      <ListItemText secondary={formatter.currency(details.balance)} />
    </ListItem>
  )
}
