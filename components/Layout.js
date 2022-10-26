import React from 'react';
import {styled} from '@mui/system';
import Footer from "./Footer";
import Main from "./Main";
import PrivateHeader from "./PrivateHeader";
import PublicHeader from "./PublicHeader";
import {Box, Grid} from "@mui/material";
import Sidebar from "./Sidebar";

const LayoutComponent = styled('div')(({theme}) => ({
	// zIndex: 1000,
	overflow: 'auto',
	// backgroundColor: "#e5dbdb",
}));

export default function Layout({children, isLoggedIn}) {
	return (
		<LayoutComponent>
			{isLoggedIn ? <PrivateHeader/> : <PublicHeader/>}
			<Main>
				<Box sx={{display: 'flex', flex: 1, width: '100%', overflowY: 'auto',}}>
					{isLoggedIn ? <Sidebar/> : null}
					{children}
				</Box>
			</Main>
			<Footer/>
		</LayoutComponent>
	)
}