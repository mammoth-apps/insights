import type { IAccount, ICreateAccount } from '@mammoth-apps/api-interfaces'
import { axiosInstance, replaceKeyPlaceholders } from '../utils'

enum ApiRoute {
  LoadAccounts = '/api/v1/accounts/:budgetId',
  GetAccount = '/api/v1/accounts/:budgetId/detail/:accountId',
  CreateAccount = '/api/v1/accounts/:budgetId',
}

class AccountApi {
  public async loadAccounts(budgetId: string): Promise<IAccount[]> {
    const response = await axiosInstance.get<IAccount[]>(
      replaceKeyPlaceholders(ApiRoute.LoadAccounts, { budgetId }),
    )
    return response.data
  }

  public async getAccount(
    budgetId: string,
    accountId: string,
  ): Promise<IAccount> {
    const response = await axiosInstance.get<IAccount>(
      replaceKeyPlaceholders(ApiRoute.GetAccount, { budgetId, accountId }),
    )
    return response.data
  }

  public async createAccount(account: ICreateAccount): Promise<IAccount> {
    const response = await axiosInstance.post(
      replaceKeyPlaceholders(ApiRoute.CreateAccount, {
        budgetId: account.budgetId,
      }),
      account,
    )
    return response.data
  }
}

export const accountApi = new AccountApi()
