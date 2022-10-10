import React from 'react';
import {useRouter} from "next/router";

export default function Index() {
  const router = useRouter()

  React.useEffect(() => {
    // TODO: Check if logged in then dashboard else login page
    router.push('/login')
  }, [])
  return null
}