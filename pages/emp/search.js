import React from 'react';
import Head from "next/head";
import {Card, CardContent, CardHeader, FormControl, Grid} from "@mui/material";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import CustomInputField from "../../components/form/partials/CustomInputField";
import {useForm} from "react-hook-form";
import {LoadingButton} from "@mui/lab";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Divider from "@mui/material/Divider";
import StickyHeadTable from "../../components/DataTable";
import * as Url from "url";

const PAGE_TITLE = `${process.env.NEXT_PUBLIC_BRAND_NAME} : Search Employee`
const SEARCH_URL = "/api/user/search"

export default function Search() {
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

		if(response.ok) {
			response = await response.json()
			setRows([...response])
			console.log('okay')
		} else {
			console.log('error')
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
							title={'Search Employee'}
							sx={{color: 'secondary.light', borderRadius: '5px'}}
						/>
						<CardContent sx={{pb: 0, width: '100%', border: '1px solid', borderColor: 'grey.300'}}>
							<Box component={'form'}
									 sx={{
										 mb: "0",
										 mt: 0,
										 '& .MuiFormControl-root': {width: '100%'},
									 }}
									 onSubmit={handleSubmit(formSubmit)}
									 noValidate
									 autoComplete="off"
							>
								<Grid container spacing={2}>
									<Grid item xs={12} md={4}>
										<CustomInputField
											id={'empId'}
											label={'Employee ID'}
											isRequired={false}
											maxLength={50}
											control={control}
											errors={errors}
											defaultValue={''}
										/>
									</Grid>
									<Grid item xs={12} md={4}>
										<CustomInputField
											id={'firstName'}
											label={'First Name'}
											isRequired={false}
											maxLength={50}
											control={control}
											errors={errors}
											defaultValue={''}
										/>
									</Grid>
									<Grid item xs={12} md={4}>
										<CustomInputField
											id={'lastName'}
											label={'Last Name'}
											isRequired={false}
											maxLength={50}
											control={control}
											errors={errors}
											defaultValue={''}
										/>
									</Grid>
								</Grid>
								<Box sx={{textAlign: 'right', my: 2,}}>
									<LoadingButton
										loading={loading}
										size="small"
										variant={'contained'}
										endIcon={<SearchOutlinedIcon/>}
										loadingPosition="end"
										type={'Search'}
									>
										Submit
									</LoadingButton>
								</Box>
							</Box>
						</CardContent>
					</Card>
					<Box sx={{mt: 2}}>
						<StickyHeadTable rows={rows}/>
					</Box>
				</Grid>
			</Grid>
		</Container>
	)
}

Search.authRequired = true