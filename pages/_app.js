import React from 'react';
import {ThemeProvider as MuiThemeProvider} from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../theme'
import PrivateLayout from "../components/PrivateLayout";
import AuthGuard from "../components/AuthGuard";
import PublicLayout from "../components/PublicLayout";
import {SWRConfig} from 'swr'
import {useRouter} from "next/router";
import CustomAlert from "../components/CustomAlert";

const LOGIN_PAGE_ROUTE = '/login'

const fetcher = ([url, token]) => (
  fetch(url, {
    headers: {
      Authorization: token,
      'Content-type': 'application/json',
    }
  }).then(res => {
    if (res.ok) {
      if (res.status === 200) {
        return res.json()
      } else {
        return res
      }
    } else {
      if (res.status === 401) {
        let error = new Error('Not authorized')
        localStorage.removeItem(process.env.NEXT_PUBLIC_TOKEN_STORAGE)
        localStorage.removeItem(process.env.NEXT_PUBLIC_COMPANY_STORAGE)
        error.status = 401
        throw error
      }
    }
  })
)

function MyApp({Component, pageProps}) {
  const router = useRouter()
  const [msg, setMsg] = React.useState("")
  const [open, setOpen] = React.useState(false)
  const [severity, setSeverity] = React.useState('')

  // list the paths where we dont want to show the success message or handle it separately
  const avoidSuccessMsgPaths = ["/login"]

  const handleClose = () => {
    setMsg("")
    setOpen(false)
  }

  return (
    <React.Fragment>
      <CssBaseline/>
      <MuiThemeProvider theme={theme}>
        <SWRConfig value={{
          fetcher: fetcher,
          onError: (error, key) => {
            if (error.status === 401) {
              setSeverity("error")
              setMsg(error.message)
              setOpen(true)
              router.push(LOGIN_PAGE_ROUTE)
            } else {
              setSeverity("error")
              setMsg(error.message)
              setOpen(true)
            }
          },
          onSuccess: async (response, key, config) => {
            if (response instanceof Response && avoidSuccessMsgPaths.indexOf(router.pathname) === -1) {
              setSeverity("success")
              setMsg((await response.json()).message)
              setOpen(true)
            }
          }
        }}>
          {
            Component.authRequired
              ? <AuthGuard>
                <PrivateLayout>
                  <Component {...pageProps} />
                </PrivateLayout>
              </AuthGuard>
              : <PublicLayout guest={Component.isPublic}>
                <Component {...pageProps} />
              </PublicLayout>
          }
          <CustomAlert msg={msg} severity={severity} isOpen={open} close={handleClose}/>
        </SWRConfig>
      </MuiThemeProvider>
    </React.Fragment>
  )
}

export default MyApp
