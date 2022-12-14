import React from 'react';
import {Box, Divider, Grid, Typography} from "@mui/material";
import MainCardLayout from "../MainCardLayout";
import CustomInputField from "./partials/CustomInputField";
import {LoadingButton} from "@mui/lab";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import StickyHeadTable from "../DataTable";
import {useForm} from "react-hook-form";
import {SEARCH_DOC_TABLE_COLS as columns} from "../../constants"
import CustomSelectField from "./partials/CustomSelectField";
import useDocTypes from "../../apiHooks/useDocTypes";
import Loading from "../Loading";
import useSearch from "../../apiHooks/useSearch";

const SEARCH_URL = "/api/docs/search"

export default function SearchDocs({title}) {
  const [searchFields, setSearchFields] = React.useState({})
  const [resetToggle, setResetToggle] = React.useState(false)
  const [showErr, setShowErr] = React.useState(false)

  const authToken = `Bearer ${localStorage.getItem(process.env.NEXT_PUBLIC_TOKEN_STORAGE)}`
  const {control, handleSubmit, reset, formState: {errors}} = useForm({mode: 'onSubmit'});

  const [loading, setLoading] = React.useState(false)

  const {docTypes, isLoading, isError} = useDocTypes(authToken)
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

  if (isLoading) {
    return <Loading/>
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
          <Typography variant={"body1"} color={"info.main"}>Search by any of the fields below:</Typography>
          {showErr && <Typography variant={"subtitle2"} color={"error.main"} sx={{my: 2}}>
            ** At least one field is required to perform search **
          </Typography>}
          <Grid container columnSpacing={4}>
            <Grid item xs={12} md={6}>
              <CustomSelectField
                id={"docType"}
                label={"Document Type"}
                isRequired={false}
                values={docTypes}
                control={control}
                errors={errors}
                defaultValue={""}
                emptyLabel={"All"}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomInputField
                id={"docNo"}
                label={"Document Number"}
                isRequired={false}
                maxLength={50}
                control={control}
                errors={errors}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomInputField
                id={"empId"}
                label={"Employee Id"}
                isRequired={false}
                maxLength={10}
                control={control}
                errors={errors}
                helperText={"Employee Id of the employee to whom doc was issued"}
              />
            </Grid>
            <Grid item xs={12} md={6}>
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
        <Divider sx={{my: 3}}/>
        <StickyHeadTable
          authToken={authToken}
          searchFields={searchFields}
          dataHook={useSearch}
          cols={columns}
          actionRoute={"/docs/#id"}
          resetToggle={resetToggle}
          baseUrl={SEARCH_URL}
        />
      </MainCardLayout>
    </>
  )
}