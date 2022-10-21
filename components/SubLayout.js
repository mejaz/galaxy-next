import React from 'react';
import Container from "@mui/material/Container";
import Head from "next/head";
import {Grid} from "@mui/material";

export default function SubLayout({pageTitle, component1, component2=null}) {
	return (
		<Container>
			<Head>
				<title>{pageTitle}</title>
				<meta name="description" content="Office home"/>
			</Head>
			<Grid container>
				<Grid item xs={12} md={9}>
					{component1}
				</Grid>
				<Grid item xs={12} md={3}>
					{component2}
				</Grid>
			</Grid>
		</Container>
	)
}

