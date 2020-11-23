import { List } from '@material-ui/core'
import React, { ReactNode } from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from '../../app'
import { AccountMenuOptionsListItem } from './account-menu-options-list-item'

type AccountMenuOptionsProps = {
  children?: ReactNode
}

export const AccountMenuOptions = ({ children }: AccountMenuOptionsProps) => {
  const { accounts } = useSelector((state: RootState) => ({
    accounts: state.accounts.accounts,
  }))
  return (
    <List dense={true}>
      {accounts.map((account) => (
        <AccountMenuOptionsListItem key={account.id} details={account} />
      ))}
      {children}
    </List>
  )
}
