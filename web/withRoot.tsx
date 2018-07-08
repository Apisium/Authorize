import * as React from 'react'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import indigo from '@material-ui/core/colors/indigo'
import CssBaseline from '@material-ui/core/CssBaseline'

const theme = createMuiTheme({
  palette: {
    primary: {
      light: indigo[300],
      main: indigo[500],
      dark: indigo[700]
    }
  }
})

export default Comp => (props => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <Comp {...props} />
  </MuiThemeProvider>
)) as any
