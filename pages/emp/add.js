import React from 'react';
import {
	Box,
	Card,
	CardContent,
	CardHeader,
	Chip,
	Grid,
} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import {useForm} from "react-hook-form";
import {useRouter} from "next/router";
import Head from "next/head";
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import CustomDatePicker from '../../components/form/CustomDatePicker'
import DateFnsUtils from "@date-io/date-fns";
import CustomInputField from "../../components/form/CustomInputField";
import CustomSelectField from "../../components/form/CustomSelectField";
import CustomMobileNoField from "../../components/form/CustomMobileNoField";
import CustomEmailField from "../../components/form/CustomEmailField";
import Button from "@mui/material/Button";
import {Stack} from "@mui/system";
import useSWR from 'swr';
import CustomAutoCompleteField from "../../components/form/CustomAutoCompleteField";
import CustomAlert from "../../components/CustomAlert";


const PAGE_TITLE = `${process.env.NEXT_PUBLIC_BRAND_NAME} : Add Employee`
const MALE_KEY = 'M'
const FEMALE_KEY = 'F'
const MALE = 'Male'
const FEMALE = 'Female'
const GENDERS = [
	{key: MALE_KEY, label: MALE},
	{key: FEMALE_KEY, label: FEMALE},
]
const SUBMIT_URL = '/api/user/add'
const SUCCESS_MESSAGE = 'Form Submitted Successfully'

// countries fetcher
const COUNTRIES_URL = '/api/countries.json'
const fetcher = (url, headers) => fetch(url, {headers}).then((res) => res.json());

export default function Add() {
	const [loading, setLoading] = React.useState(false)
	const {control, handleSubmit, reset, formState: {errors}} = useForm({mode: 'onTouched'});
	const [allCountries, setAllCountries] = React.useState([])
	const [localCountry, setLocalCountry] = React.useState('ARE')
	const [permanentCountry, setPermanentCountry] = React.useState('AFG')
	const [localCities, setLocalCities] = React.useState([])
	const [permanentCities, setPermanentCities] = React.useState([])
	const [formSubmitSuccess, setFormSubmitSuccess] = React.useState(false)
	const [gotError, setGotError] = React.useState(false)
	const [errorMsg, setErrorMsg] = React.useState(false)
	const [gotSuccess, setGotSuccess] = React.useState(false)

	const headers = {
		Authorization: `Bearer ${localStorage.getItem(process.env.NEXT_PUBLIC_TOKEN_STORAGE)}`,
		'Content-type': 'application/json'
	}

	const {data: countriesWithStates, error} = useSWR([COUNTRIES_URL, headers], fetcher);
	const router = useRouter()

	React.useEffect(function () {
		if (countriesWithStates) {
			setAllCountries(countriesWithStates)
			setPermanentCountry(countriesWithStates[0].iso3)
		}
	}, [countriesWithStates])

	React.useEffect(function () {
		if (countriesWithStates) {
			let localCountryObj = countriesWithStates.filter(obj => obj.iso3 === localCountry)[0]
			setLocalCities(localCountryObj.states)
		}
	}, [countriesWithStates, localCountry])

	React.useEffect(function () {
		if (countriesWithStates) {
			console.log(permanentCountry)
			let permanentCountryObj = countriesWithStates.filter(obj => obj.iso3 === permanentCountry)[0]
			setPermanentCities(permanentCountryObj.states)
		}
	}, [permanentCountry])

	React.useEffect(() => {
		reset()
	}, [formSubmitSuccess])

	const dateFnsObj = new DateFnsUtils()
	const minDob = dateFnsObj.addMonths(dateFnsObj.date(), +process.env.NEXT_PUBLIC_MIN_DOB_MONTHS)
	const maxDob = dateFnsObj.addMonths(dateFnsObj.date(), +process.env.NEXT_PUBLIC_MAX_DOB_MONTHS)
	const minDoj = dateFnsObj.addMonths(dateFnsObj.date(), +process.env.NEXT_PUBLIC_MIN_DOJ_MONTHS)
	const maxDoj = dateFnsObj.date()

	const formSubmit = async(data) => {
		data['primaryMobile'] = `+971${data['primaryMobile']}`
		data['secondaryMobile'] = data['secondaryMobile'] ? `+971${data['secondaryMobile']}` : null

		console.log('--data--', data)

		let response = await fetch(SUBMIT_URL, {
			method: 'POST',
			body: JSON.stringify(data),
			headers
		})

		if (response.ok) {
			setGotSuccess(true)
			setFormSubmitSuccess(true)
		} else {
			response = await response.json()
			setGotError(true)
			setErrorMsg(response.message)
		}
	}

	return (
		<Container>
			<Head>
				<title>{PAGE_TITLE}</title>
				<meta name="description" content="Office home"/>
			</Head>
			<Grid container>
				<Grid item xs={12} md={11}>
					<Card sx={{width: '80%', pt: 3}} elevation={0}>
						<CardHeader
							title={'Add Employee'}
							sx={{color: 'secondary.light', borderRadius: '5px'}}
						/>
						<CardContent sx={{width: '100%'}}>
							<Box component={'form'}
									 sx={{
										 mb: "0",
										 '& .MuiFormControl-root': {margin: "10px 0", width: '100%'},
									 }}
									 onSubmit={handleSubmit(formSubmit)}
									 noValidate
									 autoComplete="off"
							>
								<Grid container columnSpacing={4}>
									<Grid item xs={12} md={6}>
										<CustomInputField
											id={'firstName'}
											label={'First Name'}
											isRequired={true}
											maxLength={50}
											control={control}
											errors={errors}
											defaultValue={''}
										/>
										<CustomInputField
											id={'lastName'}
											label={'Last Name'}
											isRequired={true}
											maxLength={50}
											control={control}
											errors={errors}
											defaultValue={''}
										/>
										<CustomSelectField
											id={'gender'}
											label={'Gender'}
											isRequired={true}
											values={GENDERS}
											control={control}
											errors={errors}
											defaultValue={MALE_KEY}
										/>
										<CustomDatePicker
											id={'dob'}
											label={'D.O.B.'}
											control={control}
											minDate={minDob}
											maxDate={maxDob}
											defaultValue={maxDob}
											isRequired={true}
											errors={errors}
										/>
									</Grid>
									<Grid item xs={12} md={6}>
										<Stack direction={'column'} alignItems={'center'} justifyContent={'center'} spacing={2}>
											<Box sx={{
												width: '220px',
												height: '200px',
												border: '1px solid',
												borderRadius: '5px',
												borderColor: 'grey.400'
											}}/>
											<Button variant="contained" component="label">
												Upload Picture
												<input hidden accept="image/*" type="file"/>
											</Button>
										</Stack>
									</Grid>
									<Grid item xs={12} md={6}>
										<CustomMobileNoField
											id={'primaryMobile'}
											label={"Primary Mobile"}
											control={control}
											isRequired={true}
											errors={errors}
										/>
									</Grid>
									<Grid item xs={12} md={6}>
										<CustomMobileNoField
											id={'secondaryMobile'}
											label={"Secondary Mobile"}
											control={control}
											isRequired={false}
											errors={errors}
										/>
									</Grid>
									<Grid item xs={12} md={6}>
										<CustomEmailField
											id={'email'}
											label={'Email'}
											isRequired={true}
											maxLength={100}
											control={control}
											errors={errors}
											defaultValue={''}
										/>
									</Grid>
									<Grid item xs={12} md={6}>
										<CustomDatePicker
											id={'doj'}
											label={'D.O.J.'}
											control={control}
											minDate={minDoj}
											maxDate={maxDoj}
											defaultValue={maxDoj}
											isRequired={true}
											errors={errors}
										/>
									</Grid>
									<Box sx={{width: '100%', mt: 3}}>
										<Divider textAlign="center">
											<Chip label={"Local Address"}/>
										</Divider>
									</Box>

									<Grid item xs={12}>
										<CustomInputField
											id={'localAddress'}
											label={'Local Address'}
											isRequired={true}
											maxLength={200}
											control={control}
											errors={errors}
											defaultValue={''}
										/>
									</Grid>

									<Grid item xs={6}>
										<CustomSelectField
											id={'localCountry'}
											label={'Country'}
											isRequired={true}
											values={allCountries}
											valKey={'iso3'}
											valLabel={'name'}
											control={control}
											errors={errors}
											defaultValue={'ARE'}
											isReadOnly={true}
										/>
									</Grid>
									<Grid item xs={6}>
										<CustomSelectField
											id={'localCity'}
											label={'City'}
											isRequired={true}
											values={localCities}
											valKey={'code'}
											valLabel={'name'}
											control={control}
											errors={errors}
										/>
									</Grid>

									<Box sx={{width: '100%', mt: 3}}>
										<Divider textAlign="center">
											<Chip label={"Permanent Address"}/>
										</Divider>
									</Box>

									<Grid item xs={12}>
										<CustomInputField
											id={'permanentAddress'}
											label={'Permanent Address'}
											isRequired={true}
											maxLength={200}
											control={control}
											errors={errors}
											defaultValue={''}
										/>
									</Grid>

									<Grid item xs={6}>
										<CustomSelectField
											id={'permanentCountry'}
											label={'Country'}
											isRequired={true}
											valKey={'iso3'}
											valLabel={'name'}
											values={allCountries}
											control={control}
											errors={errors}
											defaultValue={'AFG'}
											additionalOnChange={setPermanentCountry}
										/>
									</Grid>
									<Grid item xs={6}>
										<CustomSelectField
											id={'permanentCity'}
											label={'City'}
											isRequired={true}
											valKey={'code'}
											valLabel={'name'}
											values={permanentCities}
											control={control}
											errors={errors}
										/>
									</Grid>

								</Grid>

								<Box sx={{textAlign: 'right', my: 2}}>
									<LoadingButton
										loading={loading}
										size="small"
										variant={'contained'}
										endIcon={<SendOutlinedIcon/>}
										loadingPosition="end"
										type={'submit'}
									>
										Submit
									</LoadingButton>
								</Box>
							</Box>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
			{gotError && <CustomAlert msg={errorMsg} severity={"error"} isOpen={gotError} parentStateFunc={setGotError}/>}
			{gotSuccess && <CustomAlert msg={SUCCESS_MESSAGE} severity={"success"} isOpen={gotSuccess} parentStateFunc={setGotSuccess}/>}
		</Container>
	)
}

Add.authRequired = true