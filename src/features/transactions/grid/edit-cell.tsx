import { TableEditColumn } from '@devexpress/dx-react-grid-material-ui'
import React from 'react'

export const EditCell = ({ errors, requiredTransactionFields, ...props }: any) => {
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
          disabled = !hasAllRequiredFields || disabled
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
