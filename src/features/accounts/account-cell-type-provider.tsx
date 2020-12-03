import { DataTypeProvider } from '@devexpress/dx-react-grid'
import { Input, MenuItem, Select } from '@material-ui/core'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from '../../app'
import type { ITransactionGridRow } from '../../interfaces'

type CellGridView = { value: string }

const AccountCellFormatter = ({ value }: CellGridView) => {
  const accountList = useSelector((rootState: RootState) => rootState.accounts.accounts)
  const accountDetails = accountList.find((account) => account.id === value)
  return <span>{accountDetails?.name ?? 'I messed up'}</span>
}

const AccountCellEditor = ({ value, onValueChange }: any) => {
  const accountId: string | undefined = value // when it's add mode this is undefined
  const [selectedAccountId, setSelectedAccountId] = useState(accountId)
  const accounts = useSelector((rootState: RootState) => rootState.accounts.accounts)
  const onChange = (
    event: React.ChangeEvent<{
      name?: string | undefined
      value: unknown
    }>,
  ) => {
    const value = event.target.value as string
    setSelectedAccountId(value)
    onValueChange(value)
  }

  return (
    <Select
      input={<Input />}
      value={selectedAccountId}
      onChange={onChange}
      style={{ width: '100%' }}
    >
      {accounts.map((account) => (
        <MenuItem key={account.id} value={account.id}>
          {account.name}
        </MenuItem>
      ))}
    </Select>
  )
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let detailKey: keyof ITransactionGridRow

export const AccountCellTypeProvider = () => {
  return (
    <DataTypeProvider
      for={[(detailKey = 'accountId')]}
      formatterComponent={AccountCellFormatter}
      editorComponent={AccountCellEditor}
    />
  )
}
