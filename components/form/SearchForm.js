import React from 'react';
import {Box, Divider, Grid, Typography} from "@mui/material";
import MainCardLayout from "../MainCardLayout";
import CustomInputField from "./partials/CustomInputField";
import {LoadingButton} from "@mui/lab";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import StickyHeadTable from "../DataTable";
import {useForm} from "react-hook-form";

import {SEARCH_EMPLOYEE_TABLE_COLS as columns} from "../../constants"
import useSearch from "../../apiHooks/useSearch";

const SEARCH_URL = "/api/user/search"

export default function SearchForm({title}) {
  const [searchFields, setSearchFields] = React.useState({})
  const [resetToggle, setResetToggle] = React.useState(false)
  const [showErr, setShowErr] = React.useState(false)

  const authToken = `Bearer ${localStorage.getItem(process.env.NEXT_PUBLIC_TOKEN_STORAGE)}`
  const {control, handleSubmit, reset, formState: {errors}} = useForm({mode: 'onSubmit'});

  const [loading, setLoading] = React.useState(false)

  const resetPageToggle = () => setResetToggle(prevState => !prevState)

  const formSubmit = async (data) => {
    if (Object.values(data).filter(Boolean).length <= 0) {
      setShowErr(true)
    } else {
      setShowErr(false)
      setLoading(true)
      setSearchFields({...data})
      resetPageToggle()
      setLoading(false)
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
          {showErr && <Typography variant={"subtitle2"} color={"error.main"} sx={{my: 2}}>
            ** At least one field is required to perform search **
          </Typography>}
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
        <StickyHeadTable
          authToken={authToken}
          searchFields={searchFields}
          dataHook={useSearch}
          cols={columns}
          actionRoute={"/emp/#id/edit"}
          resetToggle={resetToggle}
          baseUrl={SEARCH_URL}
        />
      </MainCardLayout>
    </>
  )
}