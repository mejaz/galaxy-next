import React from 'react';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";


export default function ({text}) {
  return (
    <Typography component="span">
      <Box sx={{color: "error.main", fontSize: '12px', paddingTop: '1px'}}>{text}</Box>
    </Typography>
  )
}