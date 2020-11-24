import type { ICreateAccount } from '@mammoth-apps/api-interfaces'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Input,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core'
import React, { ChangeEvent, useState } from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from 'src/app'

interface IAddAccountDialogProps {
  onClose: (accountDetails: ICreateAccount | null) => void
  isOpen: boolean
}

let key: keyof ICreateAccount

export const AccountAddDialog: React.FC<IAddAccountDialogProps> = ({
  onClose,
  isOpen,
}): JSX.Element => {
  const budgetId = useSelector(
    (state: RootState) => state.budgets.selectedBudget?.id,
  )

  const [details, setDetails] = useState<ICreateAccount>({
    name: '',
    type: 'Checking',
    balance: 0,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    budgetId: budgetId!,
  })

  const onChange = (event: ChangeEvent<any>) => {
    const { target } = event
    const { name, value } = target
    setDetails({
      ...details,
      [name]: name !== (key = 'balance') ? value : +value,
    })
  }

  const onButtonClick = () => {
    onClose(details)
  }

  const handleClose = () => {
    onClose(null)
  }

  return (
    <Dialog onClose={handleClose} aria-labelledby="dialog-title" open={isOpen}>
      <DialogTitle id="dialog-title">Add Account</DialogTitle>
      <DialogContent
        style={{ display: 'flex', flexDirection: 'column', margin: '1rem' }}
      >
        <TextField
          label={'Account Name'}
          name={(key = 'name')}
          value={details.name}
          onChange={onChange}
          style={{ marginTop: '0.5rem' }}
        />
        <Select
          name={(key = 'type')}
          input={<Input />}
          value={details.type}
          onChange={onChange}
          style={{ margin: '1rem 0' }}
        >
          {/* {Object.values(SupportedAccountType).map((type) => ( */}
          {Object.values([]).map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </Select>
        <TextField
          label={'Starting Balance'}
          name={(key = 'balance')}
          type="number"
          value={details.balance}
          onChange={onChange}
          style={{ marginBottom: '0.5rem' }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onButtonClick}>Save Account</Button>
      </DialogActions>
    </Dialog>
  )
}
