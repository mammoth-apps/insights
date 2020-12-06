import { AxiosInstance, default as Axios } from 'axios'

class BudgetRequestApi {
  public axios: AxiosInstance
  private authToken: string | null = null

  public get isApiReady(): boolean {
    return !!this.authToken
  }

  constructor() {
    this.axios = Axios.create({
      baseURL: import.meta.env.SNOWPACK_PUBLIC_BUDGET_API,
    })
    this.axios.interceptors.request.use((request) => {
      if (this.authToken) {
        request.headers['Authorization'] = `Bearer ${this.authToken}`
      }
      return request
    })
  }

  public setAuthToken(token: string): void {
    this.authToken = token
  }
}

const budgetRequestApi = new BudgetRequestApi()

export const setAuthToken = (token: string): void => {
  budgetRequestApi.setAuthToken(token)
}
export const isApiReady = (): boolean => {
  return budgetRequestApi.isApiReady
}

export const axiosInstance = budgetRequestApi.axios
