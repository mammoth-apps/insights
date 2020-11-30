import type { IDateModel } from '@mammoth-apps/api-interfaces'
import { format, parseISO } from 'date-fns'
import { format as dateFnTzFormat } from 'date-fns-tz'

export const formatter = {
  // TODO: Make sure this actually formats
  date(dateValue: string): string {
    return format(parseISO(dateValue), 'mm-dd-yyyy')
  },
  // TODO: Make sure this actually formats
  utcFormat(date: Date = new Date()): string {
    return dateFnTzFormat(date.toString(), 'mm-dd-yyyy')
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
