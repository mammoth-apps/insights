import type { IDateModel } from '@mammoth-apps/api-interfaces'

export const dateUtil = {
  toDateModel(date: string): IDateModel {
    const dateObject = new Date(date)
    return {
      year: dateObject.getFullYear(),
      day: dateObject.getDate(),
      month: dateObject.getMonth(),
      hour: dateObject.getHours(),
      minute: dateObject.getMinutes(),
      second: dateObject.getSeconds(),
    }
  },
}
