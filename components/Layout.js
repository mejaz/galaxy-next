import React from 'react';
import {styled} from '@mui/system';
import PublicHeader from "./PublicHeader";
import Footer from "./Footer";
import Main from "./Main";

const LayoutComponent = styled('div')(({theme}) => ({
  zIndex: -3,
  overflow: 'auto',
  backgroundColor: "#e5dbdb",
}));

export default function ({children}) {
  return (
    <LayoutComponent>
      <PublicHeader />
      <Main>
        {children}
      </Main>
      <Footer/>
    </LayoutComponent>
  )
}