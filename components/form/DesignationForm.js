import React from 'react';
import {Box, Button, Grid} from "@mui/material";
import MainCardLayout from "../MainCardLayout";
import CustomInputField from "./partials/CustomInputField";
import Paper from "@mui/material/Paper";
import {useForm} from "react-hook-form";
import AddModeratorIcon from '@mui/icons-material/AddModerator';
import AvailableDesignations from "../AvailableDesignations";
import Loading from "../Loading";
import useDesignations from "../../apiHooks/useDesignations";
import postDesignation from "../../apiHooks/postDesignation";
import useSWRMutation from "swr/mutation";
import deleteDesignation from "../../apiHooks/deleteDesignation";


export default function DesignationForm({title}) {
  const authToken = `Bearer ${localStorage.getItem(process.env.NEXT_PUBLIC_TOKEN_STORAGE)}`
  const [dns, setDns] = React.useState([])
  const {designations, isLoading, mutate} = useDesignations(authToken)
  const {control, handleSubmit, reset, formState: {errors}} = useForm({mode: 'onSubmit'});

  const {trigger: postTrigger} = useSWRMutation(authToken, postDesignation)
  const {trigger: deleteTrigger} = useSWRMutation(authToken, deleteDesignation)


  React.useEffect(() => {
    setDns(designations)
  }, [designations])

  const deleteDns = async (id) => {
    try {
      await deleteTrigger({id})
      await mutate()
      reset()
    } catch (e) {
      console.error("error deleting designations")
    }
  }

  const formSubmit = async (data) => {
    try {
      await postTrigger(data)
      await mutate()
      reset()
    } catch (e) {
      console.error("error adding designations")
    }
  }

  return (
    <MainCardLayout title={title}>
      <Grid container columnSpacing={6}>
        <Grid item xs={12} md={8} lg={8}>
          <Box
            component={'form'}
            onSubmit={handleSubmit(formSubmit)}
            noValidate
            autoComplete="off"
            sx={{
              mb: "0",
              "& .MuiFormControl-root": {margin: "10px 0", width: "100%"},
            }}
          >
            <Grid container spacing={4}>
              <Grid item xs={12} md={12} sx={{textAlign: 'right'}}>
                <CustomInputField
                  id={"newDesignation"}
                  label={"New Designation"}
                  isRequired={true}
                  maxLength={100}
                  control={control}
                  errors={errors}
                />
                <Button
                  type={"submit"}
                  variant="contained"
                  color="primary"
                  startIcon={<AddModeratorIcon/>}
                  sx={{width: ['100%', '100%', 100]}}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Box>
          <Paper elevation={2} sx={{p: 2, mt: 5}}>
            {
              isLoading
                ? <Loading/>
                : <AvailableDesignations dns={dns} deleteDns={deleteDns}/>
            }
          </Paper>
        </Grid>
      </Grid>
    </MainCardLayout>
  )
}
