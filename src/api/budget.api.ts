import type { IBudget, IDeleteResponse } from '@mammoth-apps/api-interfaces'
import { axiosInstance, replaceKeyPlaceholders } from '../utils'
import { BaseApi } from './base.api'

enum ApiRoute {
  CreateBudget = 'api/v1/budget',
  DeleteBudget = 'api/v1/budget/:budgetId',
  LoadBudgets = 'api/v1/budget',
}

class BudgetApi extends BaseApi {
  public async createBudget(name: string): Promise<IBudget> {
    const response = await axiosInstance.post<IBudget>(ApiRoute.CreateBudget, {
      name,
    })
    return response.data
  }
  public async loadBudgets(): Promise<IBudget[]> {
    const response = await axiosInstance.get<IBudget[]>(ApiRoute.LoadBudgets)
    return response.data
  }

  public async deleteBudget(budgetId: string): Promise<IDeleteResponse> {
    const response = await axiosInstance.delete(
      replaceKeyPlaceholders(ApiRoute.DeleteBudget, { budgetId }),
    )
    return response.data
  }
}

export const budgetApi = new BudgetApi()
