import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {useRouter} from "next/router";


// only for logged in users
const GuestHeader = (props) => {
  const router = useRouter()

  return (
    <AppBar position="sticky" sx={{
      bgcolor: process.env.NEXT_PUBLIC_COMPANY_COLOR,
      color: "common.black"
    }}>
      <Container maxWidth="xxl">
        <Toolbar disableGutters>
          {/* --- desktop view --- */}
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{
              width: "100%",
              mr: 2,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              letterSpacing: 1,
              color: "#fff"
            }}
          >
            AIFI Technologies
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default GuestHeader;