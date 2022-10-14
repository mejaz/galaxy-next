import React from 'react';
import {useRouter} from "next/router";
import Button from "@mui/material/Button";

export default function Index() {
  const router = useRouter()

  return (
    <Button variant={'outlined'} onClick={() => router.push("/login")}>Login</Button>
  )
}