export const parser = {
  removeEmpty(record: Record<string, unknown>) {
    Object.keys(record).forEach((key) => {
      if (record[key] === undefined) {
        delete record[key]
      }
    })
    return record
  },
}
