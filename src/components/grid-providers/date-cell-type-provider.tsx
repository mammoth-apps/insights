import { DataTypeProvider } from '@devexpress/dx-react-grid'
import { TextField } from '@material-ui/core'
import { LocalizationProvider, MobileDatePicker } from '@material-ui/pickers'
import DateFnAdapter from '@material-ui/pickers/adapter/date-fns'
import * as dateFn from 'date-fns'
import enLocale from 'date-fns/locale/en-US'
import React, { useEffect, useState } from 'react'
import type { ITransactionGridRow } from '../../interfaces'
import { formatter } from '../../utils'

const DateCellFormatter = ({ value }: { value: any }) => {
  return <span>{formatter.date(value)}</span>
}
const DateCellEditor = ({
  value: cellValue,
  onValueChange,
  ...props
}: {
  value: any
  onValueChange: any
}) => {
  const [inputValue, setValue] = useState<Date | null>(
    formatter.stringToDate(cellValue) || new Date(),
  )
  useEffect(() => {
    onValueChange(formatter.utcDateFormat(inputValue))
  }, [])

  const onChange = (newValue: Date | null) => {
    if (!newValue) {
      setValue(null)
      return
    }
    onValueChange(formatter.utcDateFormat(newValue))
    setValue(newValue)
  }

  return (
    <LocalizationProvider dateLibInstance={dateFn} dateAdapter={DateFnAdapter} locale={enLocale}>
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
