import React from "react";
import {useRouter} from "next/router";
import useVerifyToken from "../apiHooks/useVerifyToken";
import Loading from "./Loading";

export default function AuthGuard({children}) {
  const [authToken, setAuthToken] = React.useState(null)
  const {data} = useVerifyToken(authToken)

  React.useEffect(() => {
    setAuthToken(`Bearer ${localStorage.getItem(process.env.NEXT_PUBLIC_TOKEN_STORAGE)}`)
  }, [])

  if (!data) {
    return <Loading />
  }

  return <div>{children}</div>
}