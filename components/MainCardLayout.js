import React from 'react';
import {Box, Card, CardContent, CardHeader, Chip, Grid} from "@mui/material";
import CustomInputField from "./form/partials/CustomInputField";
import CustomSelectField from "./form/partials/CustomSelectField";
import CustomDatePicker from "./form/partials/CustomDatePicker";
import {Stack} from "@mui/system";
import Button from "@mui/material/Button";
import CustomMobileNoField from "./form/partials/CustomMobileNoField";
import CustomEmailField from "./form/partials/CustomEmailField";
import Divider from "@mui/material/Divider";
import {LoadingButton} from "@mui/lab";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import CustomAlert from "./CustomAlert";

export default function MainCardLayout({title, children}) {
	return (
		<Card sx={{width: "100%", pt: 3}} elevation={0}>
			<CardHeader
				title={title}
				sx={{color: "secondary.light", borderRadius: "5px"}}
			/>
			<CardContent sx={{width: "100%"}}>
				{children}
			</CardContent>
		</Card>
	)

}