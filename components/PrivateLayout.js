import React from 'react';
import {styled} from '@mui/system';
import Footer from "./Footer";
import Main from "./Main";
import PrivateHeader from "./PrivateHeader";
import {Box, Grid} from "@mui/material";
import Sidebar from "./Sidebar";

const LayoutComponent = styled('div')(({theme}) => ({
	// zIndex: 1000,
	overflow: 'auto',
	// backgroundColor: "#e5dbdb",
}));

export default function PrivateLayout({children}) {

	return (
		<LayoutComponent>
			<PrivateHeader/>
			<Main>
				<Box sx={{display: 'flex', flex: 1, width: '100%', overflowY: 'auto',}}>
					<Sidebar/>
					{children}
				</Box>
			</Main>
			<Footer/>
		</LayoutComponent>
	)
}