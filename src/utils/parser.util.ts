import { parse, startOfToday } from 'date-fns'

export const parser = {
  date(value: string | null | Date): Date {
    if (typeof value === 'string') {
      return parse(value, 'mm/dd/yyyy', new Date())
    }
    return startOfToday()
  },
  removeEmpty(record: Record<string, unknown>) {
    Object.keys(record).forEach((key) => {
      if (record[key] === undefined) {
        delete record[key]
      }
    })
    return record
  },
}
