export const logger = {
  log(message: string, optionalParams: any[] = []) {
    console.log(message, ...optionalParams)
  },
}
