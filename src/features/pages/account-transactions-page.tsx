import type { ITransactionDetail } from '@mammoth-apps/api-interfaces'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../../app'
import {
  IColumnExtension,
  IDataColumn,
  TransactionDataGrid,
} from '../../components/grid/transaction-data-grid'
import type { ITransactionGridView } from '../../interfaces'
import { useRouter } from '../../router/useRouter'
import { transactionFormatter } from '../../utils'
import { getTransactionsByLinkId } from '../transactions/transaction-slice'

export const AccountTransactionsPage = () => {
  // The route for this page is /app/:budgetId/account/:accountId so that's where these props come from in params
  const { params } = useRouter()
  const { budgetId, accountId } = params
  const dispatch = useDispatch()
  const { transactions, isLoading } = useSelector((state: RootState) => ({
    isLoading: state.transactions.loading,
    transactions: state.transactions.transactions,
  }))
  useEffect(() => {
    if (budgetId && accountId && !isLoading) {
      dispatch(getTransactionsByLinkId(budgetId, { accountId }))
    }
  }, [])

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
      transactions={Object.keys(transactions).reduce(
        (acc, transactionId) => ({
          ...acc,
          [transactionId]: transactionFormatter.toGridView(transactions[transactionId]),
        }),
        {} as Record<string, ITransactionGridView>,
      )}
      columns={dataColumns}
      columnExtensions={columnExtensions}
    />
  )
}
