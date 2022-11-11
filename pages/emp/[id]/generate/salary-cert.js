import React from 'react';
import SubLayout from "../../../../components/SubLayout";
import MainCardLayout from "../../../../components/MainCardLayout";
import Box from "@mui/material/Box";
import {Button, Divider, FormControl, Grid, Input, InputLabel, Typography} from "@mui/material";
import CustomInputField from "../../../../components/form/partials/CustomInputField";
import {useForm} from "react-hook-form";
import {LoadingButton} from "@mui/lab";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import CustomMobileNoField from "../../../../components/form/partials/CustomMobileNoField";
import {useRouter} from "next/router";
import CustomAlert from "../../../../components/CustomAlert";
import PageLayout from "../../../../components/PageLayout";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DisabledInputField from "../../../../components/form/partials/DisabledInputField";
import Loading from "../../../../components/Loading";
import useProfileBasic from "../../../../apiHooks/useProfileBasic";

const FileSaver = require('file-saver');

const PAGE_TITLE = `${process.env.NEXT_PUBLIC_BRAND_NAME} : Generate Salary Certificate`
const SUCCESS_MESSAGE = "Salary Certificate generated successfully"

const SalaryCertificateForm = () => {
  const router = useRouter()
  const {id} = router.query
  const authToken = `Bearer ${localStorage.getItem(process.env.NEXT_PUBLIC_TOKEN_STORAGE)}`

  const [loading, setLoading] = React.useState(false)
  // react hook form config
  const {
    control, handleSubmit, reset,
    formState: {errors}
  } = useForm({
    mode: 'onTouched',
  });

  const [formSubmitSuccess, setFormSubmitSuccess] = React.useState(false)
  const [gotError, setGotError] = React.useState(false)
  const [errorMsg, setErrorMsg] = React.useState(false)
  const [gotSuccess, setGotSuccess] = React.useState(false)

  const {profile, isLoading, isError} = useProfileBasic(id, authToken);

  if (isLoading) {
    return <Loading />
  }

  const formSubmit = async (data) => {
    setLoading(true)
    const SUBMIT_URL = `/api/user/generate/${id}`
    console.log(data)
    data['formType'] = 'SC'

    const headers = {
      Authorization: authToken,
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
      let reqId = response.headers.get("requestId")

      response = await response.blob()

      FileSaver.saveAs(response, filename)
      setGotSuccess(true)
      setFormSubmitSuccess(prevState => !prevState)
      setTimeout(() => {
        router.replace(`/docs/${reqId}`)
      }, 500)

    } else {
      response = await response.json()
      setGotError(true)
      setErrorMsg(response.message)
    }

    setLoading(false)
  }

  return (
    <MainCardLayout title={'Salary Certificate'}>
      <Box component={"form"}
           sx={{
             mb: "0",
             "& .MuiFormControl-root": {margin: "10px 0", width: "100%"},
           }}
           onSubmit={handleSubmit(formSubmit)}
           noValidate
           autoComplete="off"
      >
        <Typography variant={"body1"} color={"info.main"} sx={{mb: 3}}>Please provide the below required details: </Typography>
        <Grid container columnSpacing={4}>
          <Grid item xs={12} md={7}>
            <CustomInputField
              id={"docNo"}
              label={"Document Number"}
              isRequired={true}
              maxLength={100}
              control={control}
              errors={errors}
              placeholder="HRD/SC/2022/xxx/AIFIxxx"
              defaultValue={"HRD/SC/2022/"}
              helperText={"e.g. HRD/SC/2022/xxx/AIFIxxx"}
            />
          </Grid>
          <Grid item xs={12} md={5}>
            <CustomMobileNoField
              id={"salary"}
              label={"Salary"}
              isRequired={true}
              adornVal={"Dhs."}
              maxLength={20}
              control={control}
              errors={errors}
            />
          </Grid>
        </Grid>
        <Divider sx={{my: 3}}/>
        <Box>
          <Typography variant={"body1"} color={"info.main"} sx={{mb: 3}}>Employee info that will be printed on the
            certificate: </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <DisabledInputField id={"empId"} label={"Employee Id"} value={profile.empId}/>
            </Grid>
            <Grid item xs={12} md={6}>
              <DisabledInputField id={"fullName"} label={"Full Name"} value={profile.fullName}/>
            </Grid>

            <Grid item xs={12} md={6}>
              <DisabledInputField id={"designation"} label={"Designation"} value={profile.designation}/>
            </Grid>
            <Grid item xs={12} md={6}>
              <DisabledInputField id={"doj"} label={"Date Of Joining"} value={profile.doj}/>
            </Grid>

            <Grid item xs={12} md={6}>
              <DisabledInputField id={"nationality"} label={"Nationality"} value={profile.nationality}/>
            </Grid>
            <Grid item xs={12} md={6}>
              <DisabledInputField id={"passNo"} label={"Passport Number"} value={profile.passNo}/>
            </Grid>

          </Grid>
        </Box>

        {/*<Divider sx={{my: 3}}/>*/}

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
      {gotError && <CustomAlert msg={errorMsg} severity={"error"} isOpen={gotError} parentStateFunc={setGotError}/>}
      {gotSuccess &&
      <CustomAlert msg={SUCCESS_MESSAGE} severity={"success"} isOpen={gotSuccess} parentStateFunc={setGotSuccess}/>}
    </MainCardLayout>
  )
}

export default function SalaryCert() {
  return (
    <PageLayout pageTitle={PAGE_TITLE}>
      <SalaryCertificateForm/>
    </PageLayout>
  )
}

SalaryCert.authRequired = true