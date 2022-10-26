import React from 'react';
import {Box, Grid} from "@mui/material";
import MainCardLayout from "../MainCardLayout";
import CustomInputField from "./partials/CustomInputField";
import {LoadingButton} from "@mui/lab";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import StickyHeadTable from "../DataTable";
import {useForm} from "react-hook-form";

const SEARCH_URL = "/api/user/search"
const columns = [
	{id: 'empId', label: 'Id', minWidth: 50},
	{id: 'firstName', label: 'First Name', minWidth: 170},
	{
		id: 'lastName',
		label: 'Last Name',
		minWidth: 170,
	},
	{
		id: 'dob',
		label: 'D.O.B.',
		minWidth: 100,
	},
	{
		id: 'primaryMobile',
		label: 'Primary Mobile',
		minWidth: 170,
	},
	{
		id: 'action',
		label: 'Action',
		minWidth: 100,
	},
];

export default function SearchForm({title}) {
  const {control, handleSubmit, reset, formState: {errors}} = useForm({mode: 'onSubmit'});

  const [loading, setLoading] = React.useState(false)
  const [rows, setRows] = React.useState([])

  const headers = {
    Authorization: `Bearer ${localStorage.getItem(process.env.NEXT_PUBLIC_TOKEN_STORAGE)}`,
    'Content-type': 'application/json'
  }

  const formSubmit = async (data) => {
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
             autoComplete="off"
        >
          <Grid container columnSpacing={4}>
            <Grid item xs={12} md={4}>
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
            <Grid item xs={12} md={4}>
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
            <Grid item xs={12} md={4}>
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
      </MainCardLayout>
      <StickyHeadTable rows={rows} cols={columns} actionRoute={"/emp/#id/edit"}/>
    </>
  )
}