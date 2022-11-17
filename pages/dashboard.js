import React from 'react';
import CustomAlert from "../components/CustomAlert";
import Box from "@mui/material/Box";

export default function Dashboard() {
  return (
    <Box sx={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <h1>dashboard</h1>
      <CustomAlert msg={"Hello"} severity={'error'}/>
    </Box>
  )
}

Dashboard.authRequired = true