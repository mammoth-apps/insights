export interface ITransactionGridView {
  id?: string
  budgetId: string
  date: string
  accountId: string
  categoryId: string
  payeeId: string
  inflow?: number
  outflow?: number
  memo?: string
}
