import React from 'react';
import CustomAlert from "../components/CustomAlert";
import Box from "@mui/material/Box";
import {Typography} from "@mui/material";
import Head from "next/head";

const PAGE_TITLE = `${process.env.NEXT_PUBLIC_COMMON_HEADER} : Dashboard`
export default function Dashboard() {
  return (
    <>
      <Head>
        <title>{PAGE_TITLE}</title>
        <meta name="description" content="Office home"/>
      </Head>
      <Box sx={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Typography
          variant={'h1'}
          sx={{color: 'gray', textShadow: 'lightgray 0px 4px 0px'}}
        >Select options from the navigation bar</Typography>
        <CustomAlert msg={"Hello"} severity={'error'}/>
      </Box>
    </>
  )
}

Dashboard.authRequired = true