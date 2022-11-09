import React from 'react';
import {Box, Grid} from "@mui/material";
import MainCardLayout from "../MainCardLayout";
import CustomInputField from "./partials/CustomInputField";
import {LoadingButton} from "@mui/lab";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import StickyHeadTable from "../DataTable";
import {useForm} from "react-hook-form";

const SEARCH_URL = "/api/docs/search"
const columns = [
  {id: 'docNo', label: 'Doc No', minWidth: 200},
  {id: 'docType', label: 'Doc type', minWidth: 100},
  {
    id: 'issuedTo',
    label: 'Issued To',
    minWidth: 150,
  },
  {
    id: 'issuedBy',
    label: 'Issued By',
    minWidth: 150,
  },
  {
    id: 'issuedOn',
    label: 'Issued On',
    minWidth: 100,
  },
  {
    id: 'isSignedUploaded',
    label: 'Is Doc Signed?',
    minWidth: 50,
  },
  {
    id: 'action',
    label: 'Action',
    minWidth: 50,
  },
];

export default function SearchDocs({title}) {
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
                id={"docNo"}
                label={"Document Number"}
                isRequired={false}
                maxLength={50}
                control={control}
                errors={errors}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <CustomInputField
                id={"empId"}
                label={"Employee Id"}
                isRequired={false}
                maxLength={10}
                control={control}
                errors={errors}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <CustomInputField
                id={"lastName"}
                label={"Employee Last Name"}
                isRequired={false}
                maxLength={50}
                control={control}
                errors={errors}
                defaultValue={""}
                helperText={"Last Name of the employee to whom doc was issued"}
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
      <StickyHeadTable rows={rows} cols={columns} actionRoute={"/docs/#id"}/>
    </>
  )
}