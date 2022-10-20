import React from 'react'
import Head from 'next/head'
import {
  Box,
  Input,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  InputLabel
} from "@mui/material";
import {LoadingButton} from '@mui/lab';
import {useForm} from "react-hook-form";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import FormErrorText from "../components/form/partials/FormErrorText";
import {useRouter} from "next/router";
import CustomAlert from "../components/CustomAlert";

const BG_IMAGE_SVG = `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' width='1440' height='560' preserveAspectRatio='none' viewBox='0 0 1440 560'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1224%26quot%3b)' fill='none'%3e%3crect width='1440' height='560' x='0' y='0' fill='url(%23SvgjsLinearGradient1225)'%3e%3c/rect%3e%3cpath d='M1440 0L1009.5699999999999 0L1440 177.1z' fill='rgba(255%2c 255%2c 255%2c .1)'%3e%3c/path%3e%3cpath d='M1009.5699999999999 0L1440 177.1L1440 182.17L879.3899999999999 0z' fill='rgba(255%2c 255%2c 255%2c .075)'%3e%3c/path%3e%3cpath d='M879.39 0L1440 182.17L1440 359.26L514.55 0z' fill='rgba(255%2c 255%2c 255%2c .05)'%3e%3c/path%3e%3cpath d='M514.55 0L1440 359.26L1440 384.76L488.60999999999996 0z' fill='rgba(255%2c 255%2c 255%2c .025)'%3e%3c/path%3e%3cpath d='M0 560L565.33 560L0 468.40999999999997z' fill='rgba(0%2c 0%2c 0%2c .1)'%3e%3c/path%3e%3cpath d='M0 468.40999999999997L565.33 560L984.8800000000001 560L0 450.43999999999994z' fill='rgba(0%2c 0%2c 0%2c .075)'%3e%3c/path%3e%3cpath d='M0 450.44L984.8800000000001 560L1026.2700000000002 560L0 294.27z' fill='rgba(0%2c 0%2c 0%2c .05)'%3e%3c/path%3e%3cpath d='M0 294.27L1026.2700000000002 560L1216.6000000000001 560L0 187.01z' fill='rgba(0%2c 0%2c 0%2c .025)'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1224'%3e%3crect width='1440' height='560' fill='white'%3e%3c/rect%3e%3c/mask%3e%3clinearGradient x1='15.28%25' y1='-39.29%25' x2='84.72%25' y2='139.29%25' gradientUnits='userSpaceOnUse' id='SvgjsLinearGradient1225'%3e%3cstop stop-color='%230e2a47' offset='0'%3e%3c/stop%3e%3cstop stop-color='rgba(158%2c 0%2c 107%2c 1)' offset='1'%3e%3c/stop%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e")`
const LOGIN_API_URL = '/api/login/'
const DASHBOARD_ROUTE = '/dashboard'
const INVALID_LOGIN_MSG = "Invalid Username or Password"
const PAGE_TITLE = `${process.env.NEXT_PUBLIC_BRAND_NAME} : Home`

const Container = ({children}) => {
  return (
    <Box sx={{
      width: '100%',
      flexGrow: 1,
      backgroundImage: `${BG_IMAGE_SVG}`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: "top center",
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>{children}</Box>
  )
}

export default function Login() {
  const [loading, setLoading] = React.useState(false)
  const {register, handleSubmit, formState: {errors}} = useForm();
  const [error, setError] = React.useState(false)
  const router = useRouter()

  const onSubmit = async (data) => {
    setLoading(true)
    // submit the login form and get the token
    let response = await fetch(LOGIN_API_URL, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json'
      }
    })

    if (response.ok) {
      response = await response.json()
      // set the token to local storage
      localStorage.setItem(process.env.NEXT_PUBLIC_TOKEN_STORAGE, response.token)
      await router.push(DASHBOARD_ROUTE)
      setLoading(false)
    } else {
      console.log("--in error--")
      setError(true)
      setLoading(false)
    }
  }

  return (
    <Container>
      <Head>
        <title>{PAGE_TITLE}</title>
        <meta name="description" content="Office home"/>
      </Head>
      <Card sx={{width: {xs: '95%', sm: 440}}}>
        <CardHeader
          title={'Login'}
          sx={{textAlign: 'center'}}
        />
        <CardContent sx={{width: '100%'}}>
          <Box component={'form'}
            sx={{
             mb: "0",
             '& .MuiFormControl-root': {margin: "10px 0", width: '100%'},
            }}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            autoComplete="off"
          >
            <FormControl variant="standard">
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input id="email" {...register('email', {
                required: true,
                pattern: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              })} />
              {errors.email?.type === 'required' && <FormErrorText text="Email is Required"/>}
              {errors.email?.type === 'pattern' && <FormErrorText text="Invalid Email Format"/>}
            </FormControl>
            <FormControl variant="standard">
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input id="password" type="password"  {...register('password', {required: true})} />
              {errors.password?.type === 'required' && <FormErrorText text="Password is Required"/>}
            </FormControl>
            <Box sx={{textAlign: 'right', my: 2}}>
              <LoadingButton
                loading={loading}
                size="small"
                variant={'contained'}
                endIcon={<LockOpenIcon/>}
                loadingPosition="end"
                type={'submit'}
              >
                Login
              </LoadingButton>
            </Box>
          </Box>
        </CardContent>
      </Card>
      <CustomAlert msg={INVALID_LOGIN_MSG} severity={"error"} isOpen={error} />
    </Container>
  )
}
