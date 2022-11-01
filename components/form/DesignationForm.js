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

export default function DesignationForm({title}) {
  const authToken = `Bearer ${localStorage.getItem(process.env.NEXT_PUBLIC_TOKEN_STORAGE)}`
  const [dns, setDns] = React.useState([])
  const { designations, isLoading, isError } = useDesignations(authToken)
  const {control, handleSubmit, reset, formState: {errors}} = useForm({mode: 'onSubmit'});


  React.useEffect(() => {
    setDns(designations)
  }, [designations])

  const headers = {
    Authorization: authToken,
    'Content-type': 'application/json',
  }

  const deleteDns = async (id) => {
    let response = await fetch(`/api/designations/${id}`, {
      method: 'DELETE',
      headers
    })

    if (response.ok) {
      setDns(prevState => prevState.filter(obj => obj._id !== id))
    } else {
      alert('Error deleting designation')
    }
  }

  const formSubmit = async (data) => {
    let response = await fetch("/api/designations/add", {
      method: 'POST',
      body: JSON.stringify(data),
      headers
    })

    if (response.ok) {
      response = await response.json()
      setDns(prevState => [...prevState, response])
      reset()
    } else {
      response = await response.json()
      alert(response.message)
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
                ? <Loading />
                : <AvailableDesignations dns={dns} deleteDns={deleteDns}/>
            }
          </Paper>
        </Grid>
      </Grid>
    </MainCardLayout>
  )
}
