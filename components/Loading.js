import React from 'react';
import {Box, CircularProgress} from "@mui/material";

export default function Loading() {
  return (
    <Box sx={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <CircularProgress />
    </Box>
  )
}