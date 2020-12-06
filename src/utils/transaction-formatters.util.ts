import type {
  ICreateTransaction,
  ITransaction,
  ITransactionDetail,
} from '@mammoth-apps/api-interfaces'
import type { ITransactionGridRow } from '../interfaces'
import { dateFormatter } from './formatters.utils'
import { parser } from './parser.util'

export const transactionFormatter = {
  toPartialTransaction(detail: Partial<ITransactionDetail>): Partial<ITransaction> {
    const response: Partial<ITransaction> = {
      id: detail.id ?? undefined,
      budgetId: detail.budgetId,
      categoryId: detail.category?.id ?? detail.categoryId,
      payeeId: detail.payee?.id ?? detail.payeeId,
      accountId: detail.account?.id ?? detail.accountId,
      memo: detail.memo,
      inflow: detail.inflow === undefined ? undefined : detail.inflow,
      outflow: detail.outflow === undefined ? undefined : -detail.outflow,
      date: detail.date ? dateFormatter.toDateString(detail.date) : '', // TODO: Transaction - make sure this also works
    }
    return parser.removeEmpty(response)
  },
  toCreateTransaction(detail: ITransactionGridRow): ICreateTransaction {
    return {
      budgetId: detail.budgetId,
      date: detail.date,
      accountId: detail.accountId,
      payeeId: detail.payeeId,
      categoryId: detail.categoryId,
      memo: detail.memo,
      inflow: detail.inflow === undefined ? undefined : detail.inflow,
      outflow: detail.outflow === undefined ? undefined : -detail.outflow,
    }
  },
  toTransaction(detail: ITransactionDetail): ITransaction {
    return {
      budgetId: detail.budgetId,
      id: detail.id,
      date: dateFormatter.toDateString(detail.date),
      accountId: detail.accountId,
      payeeId: detail.payeeId,
      categoryId: detail.categoryId,
      memo: detail.memo,
      inflow: detail.inflow === undefined ? undefined : detail.inflow,
      outflow: detail.outflow === undefined ? undefined : -detail.outflow,
    }
  },
  toGridView(transaction: ITransactionDetail): ITransactionGridRow {
    return {
      id: transaction.id,
      accountId: transaction.accountId,
      budgetId: transaction.budgetId,
      categoryId: transaction.categoryId,
      date: dateFormatter.toDateString(transaction.date),
      inflow: transaction.inflow ?? 0,
      memo: transaction.memo,
      outflow: transaction.outflow ?? 0,
      payeeId: transaction.payeeId,
    }
  },
}
