import React from 'react';
import SubLayout from "../../../../components/SubLayout";
import MainCardLayout from "../../../../components/MainCardLayout";
import Box from "@mui/material/Box";
import {Grid} from "@mui/material";
import CustomInputField from "../../../../components/form/partials/CustomInputField";
import {useForm} from "react-hook-form";
import {LoadingButton} from "@mui/lab";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import CustomMobileNoField from "../../../../components/form/partials/CustomMobileNoField";

const PAGE_TITLE = `${process.env.NEXT_PUBLIC_BRAND_NAME} : Generate Salary Transfer Letter`

const SalaryTLForm = () => {
	const [loading, setLoading] = React.useState(false)
	// react hook form config
	const {
		control, handleSubmit, reset,
		formState: {errors}
	} = useForm({
		mode: 'onTouched',
	});

	const formSubmit = (data) => {
		setLoading(true)
		console.log(data)

		setLoading(false)
	}

	return (
		<MainCardLayout title={'Salary Transfer Letter'}>
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
							maxLength={10}
							control={control}
							errors={errors}
							placeholder="HRD/STL/2022/xxx/AIFIxxx"
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<CustomInputField
							id={"passportNo"}
							label={"Passport Number"}
							isRequired={true}
							maxLength={10}
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
					<Grid item xs={12} md={6}>
						<CustomInputField
							id={"accNo"}
							label={"Account Number"}
							isRequired={true}
							maxLength={30}
							control={control}
							errors={errors}
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<CustomInputField
							id={"iban"}
							label={"IBAN Number"}
							isRequired={true}
							maxLength={30}
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

export default function SalaryTransferLetter() {
	return (
		<SubLayout
			pageTitle={PAGE_TITLE}
			component1={<SalaryTLForm/>}/>
	)
}

SalaryTransferLetter.authRequired = true