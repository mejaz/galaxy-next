import React from 'react'
import {useRouter} from "next/router";
import {Box, Card, CardContent, CardHeader, Grid, Typography} from "@mui/material";
import CustomInputField from "../../../components/form/partials/CustomInputField";
import {LoadingButton} from "@mui/lab";
import {useForm} from "react-hook-form";
import SendIcon from '@mui/icons-material/Send';
import useSWRMutation from "swr/mutation";
import postVerifyDoc from "../../../apiHooks/postVerifyDoc";


export default function ViewPublicDoc() {
  const router = useRouter()
  const {reqId} = router.query
  const [loading, setLoading] = React.useState(false)

  const {control, handleSubmit, reset, formState: {errors}} = useForm({mode: 'onSubmit'});
  const {trigger: postTrigger} = useSWRMutation(reqId, postVerifyDoc)

  const formSubmit = async (data) => {
    setLoading(true)
    try {
      let file = await postTrigger(data)
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL);
      reset()
    } catch (e) {
      console.error("error fetching document")
    }
    setLoading(false)
  }

  return (
    <Box sx={{
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Box component={"form"}
           sx={{
             mb: "0",
             "& .MuiFormControl-root": {margin: "10px 0", width: "100%"},
           }}
           onSubmit={handleSubmit(formSubmit)}
           noValidate
      >
        <Card sx={{maxWidth: {xs: 345, sm: 400, md: 500}, p: 1}} elevation={5}>
          <CardHeader
            title={<Typography variant={"body1"} textAlign={"center"}>Please provide below details to view the
              certificate</Typography>}

          />
          <CardContent>
            <Grid container columnSpacing={4}>
              <Grid item xs={12}>
                <CustomInputField
                  id={"empId"}
                  label={"Employee Id"}
                  isRequired={true}
                  maxLength={50}
                  control={control}
                  errors={errors}
                  defaultValue={""}
                />
              </Grid>
              <Grid item xs={12}>
                <CustomInputField
                  id={"lastName"}
                  label={"Employee Last Name"}
                  isRequired={true}
                  maxLength={50}
                  control={control}
                  errors={errors}
                  defaultValue={""}
                />
              </Grid>
            </Grid>
            <Box sx={{textAlign: "right", my: 2,}}>
              <LoadingButton
                loading={loading}
                size="small"
                variant={"contained"}
                endIcon={<SendIcon/>}
                loadingPosition="end"
                type={"submit"}
              >
                Submit
              </LoadingButton>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  )
}

ViewPublicDoc.isPublic = true
