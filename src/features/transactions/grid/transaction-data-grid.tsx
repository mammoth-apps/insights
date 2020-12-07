import {
  ChangeSet,
  Column,
  EditingState,
  IntegratedSorting,
  Sorting,
  SortingState,
} from '@devexpress/dx-react-grid'
import {
  Grid,
  Table,
  TableEditColumn,
  TableEditRow,
  TableHeaderRow,
} from '@devexpress/dx-react-grid-material-ui'
import type { ITransactionDetail } from '@mammoth-apps/api-interfaces'
import Paper from '@material-ui/core/Paper'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../../../app'
import { CurrencyCellTypeProvider } from '../../../components/grid-providers/currency-cell-type-provider'
import { DateCellTypeProvider } from '../../../components/grid-providers/date-cell-type-provider'
import { ITransactionGridView } from '../../../interfaces'
import { transactionFormatter } from '../../../utils'
import { AccountCellTypeProvider } from '../../accounts/account-cell-type-provider'
import { CategoryCellTypeProvider } from '../../category/category-cell-type-provider'
import { PayeeCellTypeProvider } from '../../payee/payee-cell-type-provider'
import { createTransaction, deleteTransaction, updateTransaction } from '../transaction-slice'
import { EditCell } from './edit-cell'

const getRowId = (row: ITransactionGridView): string => row.id

export interface IDataColumn<T> {
  name: keyof T
  title: string
  isRequired: boolean
}

export interface IColumnExtension<TData> {
  columnName: keyof TData
  width: string | number
}

export interface IDataTable<TData> {
  columns: IDataColumn<TData>[]
  columnExtensions?: IColumnExtension<TData>[]
  transactions: Record<string, ITransactionGridView>

  hideControls?: boolean
}

export const TransactionDataGrid: React.FC<IDataTable<any>> = ({
  transactions,
  columns,
  columnExtensions,
  hideControls,
}) => {
  const dispatch = useDispatch()
  const [errors, setErrors] = useState<Record<string, boolean>>({})
  const { selectedBudgetId } = useSelector((state: RootState) => ({
    selectedBudgetId: state.budgets.selectedBudget?.id,
  }))
  const gridData = Object.values(transactions)

  const [sorting, setSorting] = useState<Sorting[]>([{ columnName: 'date', direction: 'desc' }])

  if (!selectedBudgetId) {
    return <div>There is no selected budget! Sorry!</div>
  }

  const requiredColumnKeys: string[] = columns.reduce((accumulator, item) => {
    if (item.isRequired) {
      accumulator.push(item.name as string)
    }
    return accumulator
  }, [] as string[])

  const commitChanges = ({ added, changed, deleted }: ChangeSet) => {
    if (added) {
      const rows = added as Omit<ITransactionGridView, 'budgetId'>[]
      // this is a new transaction so need to pass it along the Id otherwise I could pick it from state
      rows.forEach((row) => {
        dispatch(
          createTransaction(
            transactionFormatter.toCreateTransaction({ ...row, budgetId: selectedBudgetId }),
          ),
        )
      })
    }
    if (changed) {
      // key is the transactionId and the value is the updated values to send along.
      Object.keys(changed as Record<string, Partial<ITransactionDetail>>).forEach(
        (transactionId) => {
          dispatch(
            updateTransaction({
              ...transactions[transactionId],
              ...changed[transactionId],
            }),
          )
        },
      )
    }
    if (deleted) {
      const transactionIds = deleted as string[]
      transactionIds.forEach((transactionId) => {
        dispatch(deleteTransaction(selectedBudgetId, transactionId))
      })
    }
  }

  const validate = (
    rows: Record<string, ITransactionGridView>,
    columns: IDataColumn<ITransactionGridView>[],
  ) => {
    return Object.entries(rows).reduce(
      (acc, [transactionId, transaction]) => ({
        ...acc,
        [transactionId]: Object.keys(transaction).some((valueKey) => {
          const column = columns.find((column) => column.name === valueKey)
          if (column) {
            return column.isRequired && !!(transaction as any)[valueKey] === false
          }
          return false
        }),
      }),
      {},
    )
  }

  const onEdited = (edited: Record<string, ITransactionGridView>) => {
    setErrors(validate(edited, columns))
  }

  return (
    <Paper>
      <Grid rows={gridData} columns={columns as Column[]} getRowId={getRowId}>
        <SortingState sorting={sorting} onSortingChange={setSorting} />
        <IntegratedSorting />
        {/* Custom Cells these could probably be abstracted to {children} later */}
        <AccountCellTypeProvider />
        <PayeeCellTypeProvider />
        <CategoryCellTypeProvider />
        <DateCellTypeProvider />
        <CurrencyCellTypeProvider />
        {/* End custom cells */}
        <EditingState onRowChangesChange={onEdited} onCommitChanges={commitChanges} />
        <Table
          columnExtensions={
            columnExtensions?.map(({ columnName, width }) => ({
              columnName: columnName as string, // a little type manipulation.
              width,
            })) ?? []
          }
        />
        <TableHeaderRow showSortingControls />
        <TableEditRow />
        {!hideControls && (
          <TableEditColumn
            showAddCommand
            showEditCommand
            showDeleteCommand
            cellComponent={(props) => (
              <EditCell {...props} errors={errors} requiredTransactionFields={requiredColumnKeys} />
            )}
          />
        )}
      </Grid>
    </Paper>
  )
}
