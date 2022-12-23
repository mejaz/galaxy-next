import React from 'react';
import {useRouter} from "next/router";
import Box from "@mui/material/Box";
import Loading from "../components/Loading";

export default function Index() {
  const router = useRouter()

  React.useEffect(() => {
    router.push("/login")
  }, [])

  return (
    <Box sx={{width: '100%', display: 'flex', alignItems: "center", justifyContent: 'center'}}>
      <Loading />
    </Box>

  )
}