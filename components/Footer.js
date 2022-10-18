import React from 'react';
import {styled} from '@mui/system';
import {Typography} from "@mui/material";

const FooterComponent = styled('div')(({theme}) => ({
	position: 'sticky',
	display: 'flex',
	flex: 0,
	padding: '1rem 0',
	borderTop: '1px solid #eaeaea',
	justifyContent: 'center',
	alignItems: 'center',
	letterSpacing: '1px',
	backgroundColor: theme.palette.common.offWhite,
}))

export default function Footer() {
	return (
		<FooterComponent>
				<Typography variant={'overline'}>{process.env.NEXT_PUBLIC_COMPANY_NAME} &#169; 2022</Typography>
		</FooterComponent>
	)
}