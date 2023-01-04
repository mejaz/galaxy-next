import React from 'react';
import Container from "@mui/material/Container";
import Head from "next/head";
import {Grid} from "@mui/material";

export default function PageLayout({pageTitle, children, sideComponent=null}) {
	return (
		<Container maxWidth={'xxl'}>
			<Head>
				<title>{pageTitle}</title>
				<meta name="description" content="Office home"/>
			</Head>
			<Grid container>
				<Grid item xs={12} md={12} lg={9} >
					{children}
				</Grid>
				<Grid item xs={12} md={12} lg={3}>
					{sideComponent}
				</Grid>
			</Grid>
		</Container>
	)
}

