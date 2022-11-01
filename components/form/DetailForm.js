import React from 'react';
import {Box, Button, Grid, Typography} from "@mui/material";
import MainCardLayout from "../MainCardLayout";
import CustomInputField from "./partials/CustomInputField";
import {LoadingButton} from "@mui/lab";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Paper from "@mui/material/Paper";
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import DownloadIcon from '@mui/icons-material/Download';
import {useRouter} from "next/router";

const FileSaver = require('file-saver');

export default function DetailForm({title}) {
  const router = useRouter()
  const headers = {
    Authorization: `Bearer ${localStorage.getItem(process.env.NEXT_PUBLIC_TOKEN_STORAGE)}`,
    'Content-type': 'application/json',
  }

  const {reqId} = router.query

  const downloadDoc = async (signed) => {
    let response = await fetch(`/api/docs/${reqId}/download/?signed=${signed}`, {headers})

    if (response.ok) {
      let contentDispositionHeader = response.headers.get("Content-Disposition")
      let filename = contentDispositionHeader.split("filename=").pop()

      response = await response.blob()

      FileSaver.saveAs(response, filename)
    }

  }

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
              <Button variant="contained" color="warning" startIcon={<DownloadOutlinedIcon/>}
                onClick={() => downloadDoc(false)}
              >Download</Button>
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
              <Button variant="contained" color="success" startIcon={<DownloadIcon/>}>Download</Button>
            </Paper>
          </Grid>
        </Grid>
      </Box>

    </MainCardLayout>
  )
}
