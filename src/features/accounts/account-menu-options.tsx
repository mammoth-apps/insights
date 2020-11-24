import { List } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from '../../app'
import { AccountAddDialogListItem } from './account-add-dialog-list-item'
import { AccountMenuOptionsListItem } from './account-menu-options-list-item'

export const AccountMenuOptions = () => {
  const { accounts } = useSelector((state: RootState) => ({
    accounts: state.accounts.accounts,
  }))

  const listItems = accounts.map((account) => (
    <AccountMenuOptionsListItem key={account.id} details={account} />
  ))
  listItems.push(<AccountAddDialogListItem key="account-menu-add-button" />)

  return <List dense={true}>{listItems}</List>
}
