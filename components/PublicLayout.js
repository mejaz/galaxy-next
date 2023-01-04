import React from 'react';
import {styled} from '@mui/system';
import Footer from "./Footer";
import Main from "./Main";
import PublicHeader from "./PublicHeader";
import {Box, Grid} from "@mui/material";
import GuestHeader from "./GuestHeader";

const LayoutComponent = styled('div')(({theme}) => ({
  // zIndex: 1000,
  overflow: 'auto',
  // backgroundColor: "#e5dbdb",
}));

export default function PublicLayout({children, guest}) {
  return (
    <LayoutComponent>
      {guest ? <GuestHeader /> : <PublicHeader/>}
      <Main>
        <Box sx={{display: 'flex', flex: 1, width: '100%', overflowY: 'auto',}}>
          {children}
        </Box>
      </Main>
      <Footer/>
    </LayoutComponent>
  )
}