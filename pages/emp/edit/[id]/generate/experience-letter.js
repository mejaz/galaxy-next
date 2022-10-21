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

const PAGE_TITLE = `${process.env.NEXT_PUBLIC_BRAND_NAME} : Experience Letter`

const ExperienceLetterForm = () => {
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
		<MainCardLayout title={'Experience Letter'}>
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
							placeholder="HRD/CE/2022/xxx"
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

export default function ExperienceLetter() {
	return (
		<SubLayout
			pageTitle={PAGE_TITLE}
			component1={<ExperienceLetterForm />}/>
	)
}

ExperienceLetter.authRequired = true