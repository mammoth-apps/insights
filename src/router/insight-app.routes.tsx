// export const BudgetRouter = () => {
//   const budgetStore = useBudgetStore()
//   return (
//     <DataProvider selectedBudget={budgetStore.selectedBudget}>
//       <PageLayout
//         budgetListConfig={<BudgetMenuOptions />}
//         accountListConfig={<AccountMenuOptions />}
//         content={
//           <Switch>
//             <Route exact path={RoutePaths.BudgetHub} component={HubPage} />
//             <Route path={RoutePaths.CategoryBreakdownPage} component={CategoryBreakdownPage} />
//             <Route path={RoutePaths.AccountPage} component={AccountPage} />
//             <Route path={RoutePaths.TransactionsPage} component={TransactionsPage} />
//           </Switch>
//         }
//       />
//     </DataProvider>
//   )
// }
