import React from 'react';
import {ThemeProvider as MuiThemeProvider} from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../theme'
import Layout from "../components/Layout";

function MyApp({Component, pageProps}) {
  return (
    <React.Fragment>
      <CssBaseline/>
      <MuiThemeProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </MuiThemeProvider>
    </React.Fragment>
  )
}

export default MyApp
