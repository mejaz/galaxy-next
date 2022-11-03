import React from 'react';
import SubLayout from "../../../../components/SubLayout";
import MainCardLayout from "../../../../components/MainCardLayout";
import Box from "@mui/material/Box";
import {Grid} from "@mui/material";
import CustomInputField from "../../../../components/form/partials/CustomInputField";
import {useForm} from "react-hook-form";
import {LoadingButton} from "@mui/lab";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import CustomMobileNoField from "../../../../components/form/partials/CustomMobileNoField";
import PageLayout from "../../../../components/PageLayout";
import CustomAlert from "../../../../components/CustomAlert";
import {useRouter} from "next/router";

const FileSaver = require('file-saver');

const PAGE_TITLE = `${process.env.NEXT_PUBLIC_BRAND_NAME} : Experience Letter`
const SUCCESS_MESSAGE = "Certificate of Experience generated successfully"

const ExperienceLetterForm = () => {
  const router = useRouter()
  const {id} = router.query

  const [loading, setLoading] = React.useState(false)
  const [formSubmitSuccess, setFormSubmitSuccess] = React.useState(false)
  const [gotError, setGotError] = React.useState(false)
  const [errorMsg, setErrorMsg] = React.useState(false)
  const [gotSuccess, setGotSuccess] = React.useState(false)
  // react hook form config
  const {
    control, handleSubmit, reset,
    formState: {errors}
  } = useForm({
    mode: 'onTouched',
  });

  const formSubmit = async (data) => {
    setLoading(true)
    const SUBMIT_URL = `/api/user/generate/${id}`
    console.log(data)
    data['formType'] = 'EL'

    const headers = {
      Authorization: `Bearer ${localStorage.getItem(process.env.NEXT_PUBLIC_TOKEN_STORAGE)}`,
      'Content-type': 'application/json',
    }

    let response = await fetch(SUBMIT_URL, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: headers,
    })

    if (response.ok) {
      let contentDispositionHeader = response.headers.get("Content-Disposition")
      let filename = contentDispositionHeader.split("filename=").pop()
      let reqId = filename.split("_")[2]

      response = await response.blob()

      FileSaver.saveAs(response, filename)
      setGotSuccess(true)
      setFormSubmitSuccess(prevState => !prevState)
      setTimeout(() => {
        router.replace(`/emp/docs/${reqId}`)
      }, 500)

    } else {
      response = await response.json()
      setGotError(true)
      setErrorMsg(response.message)
    }

    setLoading(false)
  }

  return (
    <MainCardLayout title={'Experience Letter'}>
      <Box component={"form"}
           sx={{
             mb: "0",
             "& .MuiFormControl-root": {margin: "10px 0", width: "100%"},
           }}
           onSubmit={handleSubmit(formSubmit)}
           noValidate
           autoComplete="off"
      >
        <Grid container columnSpacing={4}>
          <Grid item xs={12} md={8}>
            <CustomInputField
              id={"docNo"}
              label={"Document Number"}
              isRequired={true}
              maxLength={50}
              control={control}
              errors={errors}
              placeholder="HRD/CE/2022/xxx"
              defaultValue={"HRD/CE/2022/"}
              helperText={"e.g. HRD/CE/2022/xxx"}
            />
            <Box sx={{textAlign: "right", my: 2}}>
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
          </Grid>
        </Grid>
      </Box>
      {gotError && <CustomAlert msg={errorMsg} severity={"error"} isOpen={gotError} parentStateFunc={setGotError}/>}
      {gotSuccess &&
      <CustomAlert msg={SUCCESS_MESSAGE} severity={"success"} isOpen={gotSuccess} parentStateFunc={setGotSuccess}/>}
    </MainCardLayout>
  )
}

export default function ExperienceLetter() {
  return (
    <PageLayout pageTitle={PAGE_TITLE}>
      <ExperienceLetterForm/>
    </PageLayout>
  )
}

ExperienceLetter.authRequired = true