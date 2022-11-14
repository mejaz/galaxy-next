import React from 'react';
import MenuItem from "@mui/material/MenuItem";
import {Card, CardContent, CardHeader, ListItemIcon, MenuList} from "@mui/material";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import Typography from "@mui/material/Typography";
import CurrencyExchangeOutlinedIcon from "@mui/icons-material/CurrencyExchangeOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import {useRouter} from "next/router";

export default function QuickLinks({id}) {
	const router = useRouter()

	return (
		<Card sx={{width: '100%', my: 5}} elevation={2}>
			<CardHeader
				subheader={'Generate:'}
				sx={{color: 'common.white', bgcolor: 'secondary.light', "& .MuiCardHeader-subheader": {color: 'common.white'}}}
			/>
			<CardContent sx={{width: "100%", p: 0, m: 0}}>
				<MenuList sx={{p: 0, m: 0}}>
					<MenuItem divider onClick={() => router.push(`/emp/${id}/generate/salary-cert`)}>
						<ListItemIcon>
							<AttachMoneyOutlinedIcon fontSize="small"/>
						</ListItemIcon>
						<Typography variant={'overline'} color={'secondary'}>Salary Certificate</Typography>
					</MenuItem>
					<MenuItem divider onClick={() => router.push(`/emp/${id}/generate/salary-transfer-letter`)}>
						<ListItemIcon>
							<CurrencyExchangeOutlinedIcon fontSize="small"/>
						</ListItemIcon>
						<Typography variant={'overline'} color={'secondary'}>Salary Transfer Letter</Typography>
					</MenuItem>
					<MenuItem onClick={() => router.push(`/emp/${id}/generate/experience-letter`)}>
						<ListItemIcon>
							<TrendingUpOutlinedIcon fontSize="small"/>
						</ListItemIcon>
						<Typography variant={'overline'} color={'secondary'}>Experience Letter</Typography>
					</MenuItem>
				</MenuList>
			</CardContent>
		</Card>
	)
}