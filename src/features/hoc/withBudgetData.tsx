import type { ComponentType } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../../app'

export const withBudgetData = (WrappedComponent: JSX.Element) => (
  props: any,
) => {
  const dispatch = useDispatch()
  const { accounts, categories, payees } = useSelector((state: RootState) => ({
    accounts: state.accounts,
    categories: state.categories,
    payees: state.payees,
  }))
  console.log(props)
  return WrappedComponent
}
