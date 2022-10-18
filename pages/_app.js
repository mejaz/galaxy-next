import React from 'react';
import {ThemeProvider as MuiThemeProvider} from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../theme'
import Layout from "../components/Layout";
import AuthGuard from "../components/AuthGuard";

function MyApp({Component, pageProps}) {
	return (
		<React.Fragment>
			<CssBaseline/>
			<MuiThemeProvider theme={theme}>
				{
					Component.authRequired
						? <AuthGuard>
							<Layout>
								<Component {...pageProps} />
							</Layout>
						</AuthGuard>
						: <Layout><Component {...pageProps} /></Layout>
				}
			</MuiThemeProvider>
		</React.Fragment>
	)
}

export default MyApp
