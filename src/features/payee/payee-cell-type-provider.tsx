import { DataTypeProvider } from '@devexpress/dx-react-grid'
import type { IPayee } from '@mammoth-apps/api-interfaces'
import { TextField } from '@material-ui/core'
import { Autocomplete, createFilterOptions } from '@material-ui/lab'
import React, { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { payeeApi } from '../../api/payee.api'
import type { RootState } from '../../app'
import type { ITransactionGridView } from '../../interfaces'
import { createPayeeFailure, createPayeeStart, createPayeeSuccess } from './payee-slice'

const filter = createFilterOptions<IPayee>()

type CellGridView = { value: string }

const PayeeCellFormatter = ({ value: payeeId }: CellGridView) => {
  const selectedPayee = useSelector((rootState: RootState) =>
    rootState.payees.payees.find((payee) => payee.id === payeeId),
  )
  return <span>{selectedPayee?.name ?? 'Payee messed up'}</span>
}

const PayeeCellEditor = ({ value, onValueChange }: any) => {
  const dispatch = useDispatch()
  const payeeId: string | undefined = value // when it's add mode this is undefined
  const { matchingPayee, payeeList, selectedBudgetId } = useSelector((rootState: RootState) => ({
    payeeList: rootState.payees.payees,
    matchingPayee: rootState.payees.payees.find((payee) => payee.id === payeeId),
    selectedBudgetId: rootState.budgets.selectedBudget?.id,
  }))
  const [selectedPayee, setSelectedPayee] = useState<IPayee | null>(
    payeeId ? matchingPayee ?? null : null,
  )

  const onChange = useCallback(
    (payee: IPayee | null) => {
      console.log(payee)
      onValueChange(payee?.id)
      setSelectedPayee(payee)
    },
    [onValueChange],
  )

  const onAutoCompleteSelection = (payee: IPayee | string) => {
    if (typeof payee === 'string' || payee.id === '') {
      // create the payee and set the selectedPayee to the server payee
      let payeeName = typeof payee === 'string' ? payee : payee.name
      payeeName =
        payeeName.charAt(payeeName.length - 1) === '"' ? payeeName.slice(0, -1) : payeeName
      // * Two cases come in here one that looks like 'Create "Payee A"' and one that looks like 'Payee A'

      dispatch(createPayeeStart())
      payeeApi
        .createPayee({
          name: payeeName.replace('Create "', ''),
          budgetId: selectedBudgetId!,
        })
        .then(
          (success) => {
            dispatch(createPayeeSuccess(success))
            onChange(success)
          },
          (error) => {
            dispatch(createPayeeFailure(error.toString()))
          },
        )
    } else {
      onChange(payee)
    }
  }

  return (
    <Autocomplete
      id="payee-cell"
      value={selectedPayee}
      options={payeeList}
      getOptionLabel={(option: IPayee) => option.name}
      onChange={(_, newValue) => {
        console.log('here it goes', newValue)
        if (typeof newValue === 'string') {
          onAutoCompleteSelection(newValue)
        } else if (newValue && newValue.id === '') {
          onAutoCompleteSelection(newValue)
        } else {
          onChange(newValue)
        }
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params)
        if (params.inputValue !== '') {
          filtered.push({
            id: '',
            name: `Create "${params.inputValue}"`,
            budgetId: '',
          })
        }
        return filtered
      }}
      freeSolo
      selectOnFocus
      renderInput={(params) => <TextField {...params} variant="outlined" />}
    />
  )
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let detailKey: keyof ITransactionGridView

export const PayeeCellTypeProvider = () => {
  return (
    <DataTypeProvider
      for={[(detailKey = 'payeeId')]}
      formatterComponent={PayeeCellFormatter}
      editorComponent={PayeeCellEditor}
    />
  )
}
