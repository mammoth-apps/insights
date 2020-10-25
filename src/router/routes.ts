export enum InsightRoute {
  Default = '/',
  Login = '/login/',
  App = '/app/',
  BudgetHub = '/app/:budgetId',
  CategoryBreakdownPage = '/app/:budgetId/categories',
  AccountPage = '/app/:budgetId/account/:accountId',
  TransactionsPage = '/app/:budgetId/transactions/',
}
