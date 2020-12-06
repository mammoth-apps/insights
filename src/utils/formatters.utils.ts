import type { IDateModel } from '@mammoth-apps/api-interfaces'
import { format, parseISO, toDate } from 'date-fns'

export const formatter = {
  date(dateValue: string): string {
    return format(new Date(dateValue), 'MM/dd/yyyy')
  },
  stringToDate(dateValue: string | null): Date {
    return dateValue ? toDate(new Date(dateValue)) : new Date()
  },
  utcFormat(dateValue: string): string {
    return parseISO(dateValue).toISOString()
  },
  utcDateFormat(dateValue: Date | null): string {
    return dateValue ? dateValue.toISOString() : new Date().toISOString()
  },
  currency(value: number): string {
    if (value < 0) {
      return `-$${Math.abs(value).toFixed(2)}`
    }
    return `$${value.toFixed(2)}`
  },
}

export const dateFormatter = {
  toDateString(dateModel: IDateModel): string {
    const date = new Date()
    date.setFullYear(dateModel.year)
    date.setMonth(dateModel.month - 1)
    date.setDate(dateModel.day)
    return date.toDateString()
  },
  toDate(dateModel: IDateModel): Date {
    const date = new Date()
    date.setFullYear(dateModel.year)
    date.setMonth(dateModel.month - 1)
    date.setDate(dateModel.day)
    return date
  },
}
