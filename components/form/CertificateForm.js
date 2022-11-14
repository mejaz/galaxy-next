import React from 'react';
import {useRouter} from "next/router";
import {useForm} from "react-hook-form";
import useProfileBasic from "../../apiHooks/useProfileBasic";
import useSWRMutation from "swr/mutation";
import postCertData from "../../apiHooks/postCertData";
import Loading from "../Loading";
import MainCardLayout from "../MainCardLayout";
import Box from "@mui/material/Box";
import {Button, Divider, Grid, Typography} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {LoadingButton} from "@mui/lab";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";

const FileSaver = require('file-saver');

export default function CertificateForm({id, title, authToken, formType, editableFields, readOnlyFields}) {
  const router = useRouter()
  const [loading, setLoading] = React.useState(false)
  // react hook form config
  const {
    control, handleSubmit, reset,
    formState: {errors}
  } = useForm({
    mode: 'onTouched',
  });

  const {profile, isLoading, isError} = useProfileBasic(id, authToken);
  const {trigger} = useSWRMutation(authToken, postCertData)

  const editFieldsClone = React.cloneElement(editableFields, {control, errors})
  const readOnlyFieldsClone = React.cloneElement(readOnlyFields, {profile})

  const formSubmit = async (data) => {
    try {
      setLoading(true)
      data["id"] = id
      data["formType"] = formType

      let responseObj = await trigger(data)

      let contentDispositionHeader = responseObj.headers.get("Content-Disposition")
      let filename = contentDispositionHeader.split("filename=").pop()
      let reqId = responseObj.headers.get("requestId")

      FileSaver.saveAs(responseObj.blob, filename)
      setTimeout(() => {
        router.replace(`/docs/${reqId}`)
      }, 500)
    } catch (error) {
      console.log(error)
      console.error("error generating certificate")
    }
    setLoading(false)
  }

  if (isLoading) {
    return <Loading/>
  }

  return (
    <MainCardLayout title={title}>
      <Box component={"form"}
           sx={{
             mb: "0",
             "& .MuiFormControl-root": {margin: "10px 0", width: "100%"},
           }}
           onSubmit={handleSubmit(formSubmit)}
           noValidate
           autoComplete="off"
      >
        <Typography variant={"body1"} color={"info.main"} sx={{mb: 3}}>Please provide the below required
          details: </Typography>
        <Grid container columnSpacing={4}>
          {editFieldsClone}
        </Grid>
        <Divider sx={{my: 3}}/>
        <Box>
          <Typography variant={"body1"} color={"info.main"} sx={{mb: 3}}>Below listed employee info will be printed on
            the
            certificate: </Typography>
          <Grid container spacing={4}>
            {readOnlyFieldsClone}
          </Grid>
        </Box>

        <Box sx={{my: 2, display: 'flex', justifyContent: 'flex-end', gap: '5px'}}>
          <Button size={"small"} variant="contained" color="secondary" startIcon={<ArrowBackIcon/>}
                  onClick={() => router.back()}
          >
            Go Back
          </Button>
          <LoadingButton
            loading={loading}
            size="small"
            variant={"contained"}
            endIcon={<SendOutlinedIcon/>}
            loadingPosition="end"
            type={"submit"}
          >
            Generate
          </LoadingButton>
        </Box>

      </Box>
    </MainCardLayout>
  )
}