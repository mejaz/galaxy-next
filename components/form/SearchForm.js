import React from 'react';
import {Box, Divider, Grid, Typography} from "@mui/material";
import MainCardLayout from "../MainCardLayout";
import CustomInputField from "./partials/CustomInputField";
import {LoadingButton} from "@mui/lab";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import StickyHeadTable from "../DataTable";
import {useForm} from "react-hook-form";

import {SEARCH_EMPLOYEE_TABLE_COLS as columns} from "../../constants"

const SEARCH_URL = "/api/user/search"

export default function SearchForm({title}) {
  const {control, handleSubmit, reset, formState: {errors}} = useForm({mode: 'onSubmit'});

  const [loading, setLoading] = React.useState(false)
  const [rows, setRows] = React.useState([])

  const headers = {
    Authorization: `Bearer ${localStorage.getItem(process.env.NEXT_PUBLIC_TOKEN_STORAGE)}`,
    'Content-type': 'application/json'
  }

  const formSubmit = async (data) => {
    if (Object.values(data).filter(Boolean).length === 0) {
      alert("At least one field required to perform search")
      return
    }

    let params = new URLSearchParams(data)
    let url = `${SEARCH_URL}?${params}`

    let response = await fetch(url, {headers})

    if (response.ok) {
      response = await response.json()
      setRows([...response])
      console.log('okay')
    } else {
      console.log('error')
    }

  }
  return (
    <>
      <MainCardLayout title={title}>
        <Box component={"form"}
             sx={{
               mb: "0",
               "& .MuiFormControl-root": {margin: "10px 0", width: "100%"},
             }}
             onSubmit={handleSubmit(formSubmit)}
             noValidate
        >
          <Typography variant={"body1"} color={"info.main"}>Search by any of the fields below:</Typography>
          <Grid container columnSpacing={4}>
            <Grid item xs={12} md={6}>
              <CustomInputField
                id={"empId"}
                label={"Employee ID"}
                isRequired={false}
                maxLength={50}
                control={control}
                errors={errors}
                defaultValue={""}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomInputField
                id={"mobNo"}
                label={"Mobile Number"}
                isRequired={false}
                maxLength={50}
                control={control}
                errors={errors}
                defaultValue={""}
                helperText={"e.g. 0561234567"}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomInputField
                id={"firstName"}
                label={"First Name"}
                isRequired={false}
                maxLength={50}
                control={control}
                errors={errors}
                defaultValue={""}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomInputField
                id={"lastName"}
                label={"Last Name"}
                isRequired={false}
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
              endIcon={<SearchOutlinedIcon/>}
              loadingPosition="end"
              type={"Search"}
            >
              Search
            </LoadingButton>
          </Box>
        </Box>
        <Divider sx={{my: 3}}/>
        {
          rows.length > 0
            ? <StickyHeadTable rows={rows} cols={columns} actionRoute={"/emp/#id/edit"}/>
            : <Typography variant={"body1"} color={"info.main"} sx={{mb: 3}}>No data to display</Typography>
        }
      </MainCardLayout>
    </>
  )
}