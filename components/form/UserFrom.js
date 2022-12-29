import React from 'react';
import {Box, Chip, Grid} from "@mui/material";
import CustomInputField from "./partials/CustomInputField";
import CustomSelectField from "./partials/CustomSelectField";
import CustomDatePicker from "./partials/CustomDatePicker";
import {Stack} from "@mui/system";
import Button from "@mui/material/Button";
import CustomMobileNoField from "./partials/CustomMobileNoField";
import CustomEmailField from "./partials/CustomEmailField";
import Divider from "@mui/material/Divider";
import {LoadingButton} from "@mui/lab";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import DateFnsUtils from "@date-io/date-fns";
import useSWR from 'swr';
import {useForm} from "react-hook-form";
import MainCardLayout from "../MainCardLayout";
import useDesignations from "../../apiHooks/useDesignations";
import Loading from "../Loading";
import CustomCheckbox from "./partials/CustomCheckbox";
import useSWRMutation from "swr/mutation";
import postEmpDetails from "../../apiHooks/postEmpDetails";

const MALE_KEY = 'M'
const FEMALE_KEY = 'F'
const MALE = 'Male'
const FEMALE = 'Female'
const GENDERS = [
  {key: MALE_KEY, label: MALE},
  {key: FEMALE_KEY, label: FEMALE},
]


// countries fetcher
const COUNTRIES_URL = '/api/countries.json'

export default function UserForm({title, id = null, isEdit = false, defaultValues = {}, mutate}) {

  const [allCountries, setAllCountries] = React.useState([])
  const [localCountry, setLocalCountry] = React.useState('ARE')
  const [permanentCountry, setPermanentCountry] = React.useState('')
  const [localCities, setLocalCities] = React.useState([])
  const [permanentCities, setPermanentCities] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [initialValues, setInitialValues] = React.useState(defaultValues)


  const [empActive, setEmpActive] = React.useState(("isActive" in initialValues) ? initialValues.isActive : true)

  const authToken = `Bearer ${localStorage.getItem(process.env.NEXT_PUBLIC_TOKEN_STORAGE)}`

  const {designations, isLoading, isError} = useDesignations(authToken)
  const {trigger} = useSWRMutation(authToken, postEmpDetails)

  // react hook form config
  const {
    control, handleSubmit, reset,
    formState: {errors}
  } = useForm({
    mode: 'onTouched',
    defaultValues: Object.keys(initialValues).length > 0 ? {
      ...initialValues,
      localAddress: initialValues.localAddress ? initialValues.localAddress.streetAddress: "",
      localCountry: initialValues.localAddress ? initialValues.localAddress.country : "",
      localCity: initialValues.localAddress ? initialValues.localAddress.city : "",
      permanentAddress: initialValues.permanentAddress ? initialValues.permanentAddress.streetAddress : "",
      permanentCountry: initialValues.permanentAddress ? initialValues.permanentAddress.country : "",
      permanentCity: initialValues.permanentAddress ? initialValues.permanentAddress.city : "",
    } : {}
  });

  // min / max dates
  const dateFnsObj = new DateFnsUtils()
  const minDob = dateFnsObj.addMonths(dateFnsObj.date(), +process.env.NEXT_PUBLIC_MIN_DOB_MONTHS)
  const maxDob = dateFnsObj.addMonths(dateFnsObj.date(), +process.env.NEXT_PUBLIC_MAX_DOB_MONTHS)
  const minDoj = dateFnsObj.date(new Date(2016, 0, 1))  // 1st Jan 2016
  const maxDoj = dateFnsObj.date()


  const {data: countriesWithStates, error} = useSWR([COUNTRIES_URL]);

  React.useEffect(function () {
    if (countriesWithStates) {
      setAllCountries(countriesWithStates)
      setPermanentCountry(countriesWithStates[0].iso3)

      if (isEdit) {
        setPermanentCountry(defaultValues.permanentAddress && defaultValues.permanentAddress.country)
      }
    }
  }, [countriesWithStates])

  React.useEffect(function () {
    if (countriesWithStates) {
      let localCountryObj = countriesWithStates.filter(obj => obj.iso3 === localCountry)[0]
      setLocalCities(localCountryObj.states)
    }
  }, [countriesWithStates, localCountry])

  React.useEffect(function () {
    if (countriesWithStates && permanentCountry) {
      console.log(permanentCountry)
      let permanentCountryObj = countriesWithStates.filter(obj => obj.iso3 === permanentCountry)[0]
      setPermanentCities(permanentCountryObj.states)
    }
  }, [countriesWithStates, permanentCountry])

  const formSubmit = async (data) => {
    setLoading(true)

    try {
      // dont send lwd if emp is active
      if (empActive) {
        delete data['lwd']
      }
      data = {
        ...data,isEdit, id
      }
      await trigger(data)
      if(!isEdit) {
        reset()
      }
      mutate()
    } catch (e) {
      console.error('error saving details')
    }
    setLoading(false)
  }

  if (isLoading) {
    return <Loading/>
  }

  return <>
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
          <Grid item xs={12} md={6}>
            <CustomInputField
              id={"empId"}
              label={"Employee Id"}
              isRequired={true}
              maxLength={10}
              control={control}
              errors={errors}
              defaultValue={""}
              disable={isEdit}
            />
            <CustomInputField
              id={"firstName"}
              label={"First Name"}
              isRequired={true}
              maxLength={50}
              control={control}
              errors={errors}
              defaultValue={""}
            />
            <CustomInputField
              id={"lastName"}
              label={"Last Name"}
              isRequired={true}
              maxLength={50}
              control={control}
              errors={errors}
              defaultValue={""}
            />
            <CustomSelectField
              id={"gender"}
              label={"Gender"}
              isRequired={true}
              values={GENDERS}
              control={control}
              errors={errors}
              defaultValue={MALE_KEY}
            />
            <CustomSelectField
              id={"designation"}
              label={"Designation"}
              isRequired={true}
              values={designations}
              valKey={"_id"}
              valLabel={"name"}
              control={control}
              errors={errors}
              emptyLabel={"Select Designation"}
              // defaultValue={"ARE"}
              // isReadOnly={true}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack
              sx={{height: "100%"}}
              direction={"column"}
              alignItems={"center"}
              justifyContent={"center"}
              spacing={2}
              m={0}
            >
              <Box sx={{
                width: "220px",
                height: "200px",
                border: "1px solid",
                borderRadius: "5px",
                borderColor: "grey.400"
              }}/>
              <Button variant="contained" component="label">
                Upload Picture
                <input hidden accept="image/*" type="file"/>
              </Button>
            </Stack>
          </Grid>

          <Grid item xs={12} md={6}>
            <CustomDatePicker
              id={"doj"}
              label={"D.O.J."}
              control={control}
              minDate={minDoj}
              maxDate={maxDoj}
              defaultValue={minDoj}
              isRequired={true}
              errors={errors}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid container justifyContent={'center'} alignItems={"center"}>
              <Grid item xs={12} md={3}>
                <CustomCheckbox
                  id={"isActive"}
                  label={"Employee Active?"}
                  isRequired={true}
                  control={control}
                  errors={errors}
                  defaultValue={true}
                  additionalOnChange={() => setEmpActive(prevState => !prevState)}
                />
              </Grid>
              <Grid item xs={12} md={9}>
                <CustomDatePicker
                  id={"lwd"}
                  label={"Last Working Date"}
                  control={control}
                  minDate={minDoj}
                  maxDate={maxDoj}
                  defaultValue={minDoj}
                  isRequired={!empActive}
                  errors={errors}
                  disabled={empActive}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <CustomSelectField
              id={"nationality"}
              label={"Nationality"}
              isRequired={true}
              valKey={"iso3"}
              valLabel={"name"}
              values={allCountries}
              control={control}
              errors={errors}
              defaultValue={""}
              emptyLabel={"Select Nationality"}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CustomInputField
              id={"passNo"}
              label={"Passport Number"}
              isRequired={true}
              maxLength={50}
              control={control}
              errors={errors}
              defaultValue={""}
            />
          </Grid>
          <Divider sx={{width: '100%', my: 5}}/>

          <Grid item xs={12} md={6}>
            <CustomMobileNoField
              id={"primaryMobile"}
              label={"Primary Mobile"}
              adornVal={"+971"}
              control={control}
              isRequired={false}
              errors={errors}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CustomMobileNoField
              id={"secondaryMobile"}
              label={"Secondary Mobile"}
              adornVal={"+971"}
              control={control}
              isRequired={false}
              errors={errors}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CustomEmailField
              id={"email"}
              label={"Email"}
              isRequired={false}
              maxLength={100}
              control={control}
              errors={errors}
              defaultValue={""}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CustomDatePicker
              id={"dob"}
              label={"D.O.B."}
              control={control}
              minDate={minDob}
              maxDate={maxDob}
              defaultValue={null}
              isRequired={false}
              errors={errors}
            />
          </Grid>
          <Box sx={{width: "100%", mt: 5, mb: 3}}>
            <Divider textAlign="center">
              <Chip label={"Local Address"} sx={{color: "secondary.light", bgcolor: "transparent"}}/>
            </Divider>
          </Box>

          <Grid item xs={12}>
            <CustomInputField
              id={"localAddress"}
              label={"Local Address"}
              isRequired={false}
              maxLength={200}
              control={control}
              errors={errors}
              defaultValue={""}
            />
          </Grid>

          <Grid item xs={6}>
            <CustomSelectField
              id={"localCountry"}
              label={"Country"}
              isRequired={false}
              values={allCountries}
              valKey={"iso3"}
              valLabel={"name"}
              control={control}
              errors={errors}
              defaultValue={"ARE"}
              isReadOnly={true}
              emptyLabel={"Select Country"}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomSelectField
              id={"localCity"}
              label={"City"}
              isRequired={false}
              values={localCities}
              valKey={"code"}
              valLabel={"name"}
              control={control}
              errors={errors}
              emptyLabel={"Select City"}
            />
          </Grid>

          <Box sx={{width: "100%", mt: 5, mb: 3}}>
            <Divider textAlign="center">
              <Chip label={"Permanent Address"} sx={{color: "secondary.light", bgcolor: "transparent"}}/>
            </Divider>
          </Box>

          <Grid item xs={12}>
            <CustomInputField
              id={"permanentAddress"}
              label={"Permanent Address"}
              isRequired={false}
              maxLength={200}
              control={control}
              errors={errors}
              defaultValue={""}
            />
          </Grid>

          <Grid item xs={6}>
            <CustomSelectField
              id={"permanentCountry"}
              label={"Country"}
              isRequired={false}
              valKey={"iso3"}
              valLabel={"name"}
              values={allCountries}
              control={control}
              errors={errors}
              defaultValue={""}
              additionalOnChange={setPermanentCountry}
              emptyLabel={"Select Country"}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomSelectField
              id={"permanentCity"}
              label={"City"}
              isRequired={false}
              valKey={"code"}
              valLabel={"name"}
              values={permanentCities}
              control={control}
              errors={errors}
              emptyLabel={"Select City"}
            />
          </Grid>

        </Grid>

        <Box sx={{textAlign: "right", my: 2}}>
          <LoadingButton
            loading={loading}
            size="small"
            variant={"contained"}
            endIcon={<SendOutlinedIcon/>}
            loadingPosition="end"
            type={"submit"}
          >
            {isEdit ? "Update" : "Submit"}
          </LoadingButton>
        </Box>
      </Box>
    </MainCardLayout>
  </>
}