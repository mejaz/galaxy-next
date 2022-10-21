import React from 'react';
import SubLayout from "../../../../../components/SubLayout";
import MainCardLayout from "../../../../../components/MainCardLayout";
import Box from "@mui/material/Box";
import {Grid} from "@mui/material";
import CustomInputField from "../../../../../components/form/partials/CustomInputField";
import {useForm} from "react-hook-form";
import {LoadingButton} from "@mui/lab";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import CustomMobileNoField from "../../../../../components/form/partials/CustomMobileNoField";
import {useRouter} from "next/router";

const PAGE_TITLE = `${process.env.NEXT_PUBLIC_BRAND_NAME} : Generate Salary Certificate`

const SalaryCertificateForm = () => {
	const router = useRouter()
	const {id} = router.query
	const [loading, setLoading] = React.useState(false)
	// react hook form config
	const {
		control, handleSubmit, reset,
		formState: {errors}
	} = useForm({
		mode: 'onTouched',
	});

	const formSubmit = async (data) => {
		setLoading(true)
		const SUBMIT_URL = `/api/user/generate/${id}`
		console.log(data)
		data['formType'] = '10'

		const headers = {
			Authorization: `Bearer ${localStorage.getItem(process.env.NEXT_PUBLIC_TOKEN_STORAGE)}`,
			'Content-type': 'application/json'
		}

		let response = await fetch(SUBMIT_URL, {
			method: 'POST',
			body: JSON.stringify(data),
			headers: headers
		})

		if(response.ok) {
			console.log('success')
		} else {
			alert('error')
		}

		setLoading(false)
	}

	return (
		<MainCardLayout title={'Salary Certificate'}>
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
					<Grid item xs={12} md={8}>
						<CustomInputField
							id={"docNo"}
							label={"Document Number"}
							isRequired={true}
							maxLength={20}
							control={control}
							errors={errors}
							placeholder="HRD/SC/2022/xxx/AIFIxxx"
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<CustomInputField
							id={"passportNo"}
							label={"Passport Number"}
							isRequired={true}
							maxLength={20}
							control={control}
							errors={errors}
							defaultValue={""}
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<CustomMobileNoField
							id={"salary"}
							label={"Salary"}
							isRequired={true}
							adornVal={"Dhs."}
							maxLength={20}
							control={control}
							errors={errors}
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
						Generate
					</LoadingButton>
				</Box>

			</Box>
		</MainCardLayout>
	)
}

export default function SalaryCert() {
	return (
		<SubLayout
			pageTitle={PAGE_TITLE}
			component1={<SalaryCertificateForm/>}/>
	)
}

SalaryCert.authRequired = true