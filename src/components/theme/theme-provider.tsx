import {
  createMuiTheme,
  ThemeProvider as MuiThemeProvider,
} from '@material-ui/core'
import green from '@material-ui/core/colors/green'
import purple from '@material-ui/core/colors/purple'
import 'fontsource-roboto'
import React from 'react'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: green[500],
    },
  },
})

export const ThemeProvider: React.FC = ({ children }): JSX.Element => {
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
}
