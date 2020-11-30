export enum InsightRoute {
  Default = '/',
  Login = '/login/',
  Features = '/features/',
  Company = '/mammoth/',
  App = '/app/',
  BudgetHub = '/app/:budgetId',
  CategoryBreakdownPage = '/app/:budgetId/categories',
  AccountTransactionsPage = '/app/:budgetId/account/:accountId',
  TransactionsPage = '/app/:budgetId/transactions/',
}
