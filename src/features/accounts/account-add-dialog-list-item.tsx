import type { ICreateAccount } from '@mammoth-apps/api-interfaces'
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { AddOutlined } from '@material-ui/icons'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { AccountAddDialog } from './account-add-dialog'
import { createAccount } from './account-slice'

export const AccountAddDialogListItem = () => {
  const [isOpen, setIsOpen] = useState(false)
  const dispatch = useDispatch()

  const onAddClick = () => {
    setIsOpen(true)
  }

  const onAddDialogClose = (accountDetails: ICreateAccount | null) => {
    if (accountDetails) {
      dispatch(createAccount(accountDetails))
    }
    setIsOpen(false)
  }

  return (
    <>
      <ListItem alignItems="center" button onClick={onAddClick}>
        <ListItemIcon>
          <AddOutlined />
        </ListItemIcon>
        <ListItemText primary="Add Account" />
      </ListItem>
      <AccountAddDialog isOpen={isOpen} onClose={onAddDialogClose} />
    </>
  )
}
