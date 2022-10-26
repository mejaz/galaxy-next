import React from 'react';
import {useRouter} from "next/router";

export default function CertInfo() {
  const router = useRouter()
  const {reqId} = router.query
  return (
    <h1>{reqId}</h1>
  )
}


CertInfo.authRequired = true