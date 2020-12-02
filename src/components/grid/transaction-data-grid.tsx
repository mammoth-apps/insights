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
import type { RootState } from 'src/app'
import {
  createTransaction,
  deleteTransaction,
  updateTransaction,
} from 'src/features/transactions/transaction-slice'
import { transactionFormatter } from 'src/utils'
import { AccountCellTypeProvider } from '../../features/accounts/account-cell-type-provider'
import { CategoryCellTypeProvider } from '../../features/category/category-cell-type-provider'
import { PayeeCellTypeProvider } from '../../features/payee/payee-cell-type-provider'
import type { ITransactionGridRow } from '../../interfaces'
import { CurrencyCellTypeProvider } from '../grid-providers/currency-cell-type-provider'
import { DateCellTypeProvider } from '../grid-providers/date-cell-type-provider'

const getRowId = (row: ITransactionDetail): string => row.id

const EditCell = ({ errors, requiredTransactionFields, ...props }: any) => {
  const { children } = props
  const anyProps: any = props
  const rowData = props.tableRow.row
  const hasAllRequiredFields = requiredTransactionFields.every(
    (requiredField: string) => !!rowData[requiredField],
  )

  return (
    <TableEditColumn.Cell {...anyProps}>
      {React.Children.map(children, (child) => {
        let disabled = errors[props.tableRow.rowId]
        // * A little weird here, but it's a step and it makes the required things be filled in.
        // * Will eventually format the cell to make it show as red or something
        if (child?.props.id === 'commit' && child?.props.text === 'Save') {
          disabled = !hasAllRequiredFields
        }
        return child?.props.id === 'commit'
          ? React.cloneElement(child, {
              disabled,
            })
          : child
      })}
    </TableEditColumn.Cell>
  )
}

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
  transactions: ITransactionGridRow[]
  hideControls?: boolean
}

export const TransactionDataGrid: React.FC<IDataTable<any>> = ({
  transactions,
  columns,
  columnExtensions,
  hideControls,
}) => {
  const dispatch = useDispatch()
  const [errors, setErrors] = useState<Record<string, any>>({})
  const { selectedBudgetId } = useSelector((state: RootState) => ({
    selectedBudgetId: state.budgets.selectedBudget?.id,
  }))

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
      const rows = added as ITransactionGridRow[]
      rows.forEach((row) => {
        dispatch(createTransaction(transactionFormatter.toCreateTransaction(row)))
      })
    }
    if (changed) {
      Object.values(changed as Record<string, ITransactionDetail>).forEach((changed) => {
        dispatch(updateTransaction(changed))
      })
    }
    if (deleted) {
      ;(deleted as string[]).forEach((transactionId) => {
        dispatch(deleteTransaction(selectedBudgetId, transactionId))
      })
    }
  }

  const validate = (rows: ITransactionDetail[], columns: IDataColumn<any>[]) => {
    return Object.entries(rows).reduce(
      (acc, [rowId, row]) => ({
        ...acc,
        // have to do a little work around
        [rowId]: columns.some((column) => column.isRequired && (row as any)[column.name] === ''),
      }),
      {},
    )
  }

  const onEdited = (edited: ITransactionDetail[]) => setErrors(validate(edited, columns))

  return (
    <Paper>
      <Grid rows={transactions} columns={columns as Column[]} getRowId={getRowId}>
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
