import React from 'react';
import Head from "next/head";
import {Card, CardHeader, Grid} from "@mui/material";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import {useRouter} from "next/router";
import UserForm from "../../../components/form/UserFrom";
import QuickLinks from "../../../components/QuickLinks";
import useSWR from 'swr';

const PAGE_TITLE = `${process.env.NEXT_PUBLIC_BRAND_NAME} : Employee Details`
const USER_DETAILS_URL = "/api/user/profile"

const fetcher = (url, headers) => fetch(url, {headers}).then((res) => res.json());

export default function Edit() {
	const router = useRouter()
	const {id} = router.query

	const headers = {
		Authorization: `Bearer ${localStorage.getItem(process.env.NEXT_PUBLIC_TOKEN_STORAGE)}`,
		'Content-type': 'application/json'
	}

	const params = new URLSearchParams({id})
	const url = `${USER_DETAILS_URL}?${params}`
	const {data: userObj, error} = useSWR([url, headers], fetcher);

	if (!userObj) {
		return <h1>Loading...</h1>
	}

	console.log("--userObj---", userObj)

	return (
		<Container>
			<Head>
				<title>{PAGE_TITLE}</title>
				<meta name="description" content="Office home"/>
			</Head>
			<Grid container>
				<Grid item xs={12} md={9}>
					<UserForm title={"Employee Details"} defaultValues={userObj}
										isEdit={true} id={id}/>
				</Grid>
				<Grid item xs={12} md={3}>
					<Card sx={{width: '100%', mt: 5}} elevation={2}>
						<CardHeader
							subheader={'Generate:'}
							sx={{color: 'secondary', borderRadius: '5px'}}
						/>
						<Paper sx={{width: 320}}>
							<QuickLinks id={id}/>
						</Paper>
					</Card>

				</Grid>
			</Grid>
		</Container>
	)
}

Edit.authRequired = true