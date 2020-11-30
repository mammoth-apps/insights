import { DataTypeProvider } from '@devexpress/dx-react-grid'
import { TextField } from '@material-ui/core'
import { LocalizationProvider, MobileDatePicker } from '@material-ui/pickers'
import DateFnAdapter from '@material-ui/pickers/adapter/date-fns'
import dateFn from 'date-fns'
import React, { useEffect, useState } from 'react'
import type { ITransactionGridRow } from '../../interfaces'
import { formatter, parser } from '../../utils'

const DateCellFormatter = ({ value }: { value: any }) => {
  return <span>{formatter.date(value)}</span>
}
const DateCellEditor = ({
  value: cellValue,
  onValueChange,
}: {
  value: any
  onValueChange: any
}) => {
  const [inputValue, setValue] = useState<Date | null>(
    parser.date(cellValue) || new Date(),
  )
  useEffect(() => {
    onValueChange(formatter.utcFormat(inputValue ?? undefined))
    // ! This is effectively a useEffectOnce, I just want to get the initial value there.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onChange = (newValue: Date | null) => {
    if (!newValue) {
      setValue(null)
      return
    }
    onValueChange(formatter.utcFormat(newValue))
    setValue(newValue)
  }

  return (
    <LocalizationProvider
      dateLibInstance={dateFn}
      dateAdapter={DateFnAdapter}
      locale={'us'}
    >
      <MobileDatePicker
        value={inputValue}
        onChange={onChange}
        renderInput={(props) => <TextField {...props} />}
      />
    </LocalizationProvider>
  )
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let detailKey: keyof ITransactionGridRow

export const DateCellTypeProvider = () => {
  return (
    <DataTypeProvider
      for={[(detailKey = 'date')]}
      formatterComponent={DateCellFormatter}
      editorComponent={DateCellEditor}
    />
  )
}
