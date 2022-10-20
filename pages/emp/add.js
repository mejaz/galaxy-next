import React from 'react';
import { Grid } from "@mui/material";
import Head from "next/head";
import Container from "@mui/material/Container";
import UserForm from "../../components/form/UserFrom"

const PAGE_TITLE = `${process.env.NEXT_PUBLIC_BRAND_NAME} : Add Employee`

export default function Add() {
	return (
		<Container>
			<Head>
				<title>{PAGE_TITLE}</title>
				<meta name="description" content="Office home"/>
			</Head>
			<Grid container>
				<Grid item xs={12} md={9}>
					<UserForm title={"Add Employee"}/>
				</Grid>
			</Grid>
		</Container>
	)
}

Add.authRequired = true