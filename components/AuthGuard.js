import React from "react";
import {useRouter} from "next/router";

const LOGIN_PAGE_ROUTE = '/login'
const VERIFY_TOKEN_API_URL = '/api/verify-token'

export default function AuthGuard({children}) {
  const router = useRouter()
  const [isLoggedIn, setLoggedIn] = React.useState(false)

  React.useEffect(function () {
    fetch(VERIFY_TOKEN_API_URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(process.env.NEXT_PUBLIC_TOKEN_STORAGE)}`,
        'Content-type': 'application/json'
      }
    }).then(response => {
      if (!response.ok) {
        localStorage.removeItem(process.env.NEXT_PUBLIC_TOKEN_STORAGE)
        router.push(LOGIN_PAGE_ROUTE)
      }
      setLoggedIn(true)
    }).catch(error => console.log(error))
  }, [isLoggedIn])

  if (!isLoggedIn) {
    return <h1>Loading...</h1>
  }

  const childClone = React.cloneElement(children, {
    isLoggedIn: isLoggedIn
  })

  return childClone
}