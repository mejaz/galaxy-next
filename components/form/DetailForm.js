import React from 'react';
import {Box, Button, Grid, Typography} from "@mui/material";
import MainCardLayout from "../MainCardLayout";
import CustomInputField from "./partials/CustomInputField";
import {LoadingButton} from "@mui/lab";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Paper from "@mui/material/Paper";

export default function DetailForm({title}) {
  return (
    <MainCardLayout title={title}>
      <Box
        sx={{
          mb: "0",
          "& .MuiFormControl-root": {margin: "10px 0", width: "100%"},
        }}
        noValidate
        autoComplete="off"
      >
        <Grid container columnSpacing={4}>
          <Grid item xs={12} md={6}>
            <Paper sx={{
              p: 3,
              display: 'flex',
              alignItems: "center",
              flexWrap: 'nowrap',
              justifyContent: "space-between"
            }}>
              <Typography variant={'subtitle1'}>Unsigned Document</Typography>
              <Button>Download</Button>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{
              p: 3,
              display: 'flex',
              alignItems: "center",
              flexWrap: 'nowrap',
              justifyContent: "space-between"
            }}>
              <Typography variant={'subtitle1'}>Signed Document</Typography>
              <Button>Download</Button>
            </Paper>
          </Grid>
        </Grid>
      </Box>

    </MainCardLayout>
  )
}
