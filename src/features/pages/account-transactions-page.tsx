import type { ITransactionDetail } from '@mammoth-apps/api-interfaces'
import React from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from '../../app'
import {
  IColumnExtension,
  IDataColumn,
  TransactionDataGrid,
} from '../../components/grid/transaction-data-grid'
import { transactionFormatter } from '../../utils'
import { getTransactionsForCurrentAccount } from '../transactions/transaction-slice'

export const AccountTransactionsPage = () => {
  const transactions = useSelector((state: RootState) => getTransactionsForCurrentAccount(state))

  const dataColumns: IDataColumn<ITransactionDetail>[] = [
    { name: 'date', title: 'Date', isRequired: true },
    { name: 'payeeId', title: 'Payee', isRequired: true },
    { name: 'accountId', title: 'Account', isRequired: true },
    { name: 'categoryId', title: 'Category', isRequired: true },
    { name: 'memo', title: 'Memo', isRequired: false },
    // the server is smart enough to know how to handle the case where either
    // inflow or outflow must be present and will reject if neither is there.
    { name: 'inflow', title: 'Inflow', isRequired: false },
    { name: 'outflow', title: 'Outflow', isRequired: false },
  ]

  const columnExtensions: IColumnExtension<ITransactionDetail>[] = [
    { columnName: 'payee', width: '200px' },
    { columnName: 'category', width: '200px' },
  ]

  return (
    <TransactionDataGrid
      transactions={transactions.map((transaction) => transactionFormatter.toGridView(transaction))}
      columns={dataColumns}
      columnExtensions={columnExtensions}
    />
  )
}
