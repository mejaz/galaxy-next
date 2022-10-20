import React from 'react';
import MenuItem from "@mui/material/MenuItem";
import {ListItemIcon, MenuList} from "@mui/material";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import Typography from "@mui/material/Typography";
import CurrencyExchangeOutlinedIcon from "@mui/icons-material/CurrencyExchangeOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";

export default function QuickLinks({id}) {
	return (
		<MenuList>
			<MenuItem>
				<ListItemIcon>
					<AttachMoneyOutlinedIcon fontSize="small"/>
				</ListItemIcon>
				<Typography variant={'overline'} color={'secondary'}>Salary Certificate</Typography>
			</MenuItem>
			<MenuItem>
				<ListItemIcon>
					<CurrencyExchangeOutlinedIcon fontSize="small"/>
				</ListItemIcon>
				<Typography variant={'overline'} color={'secondary'}>Salary Transfer Letter</Typography>
			</MenuItem>
			<MenuItem>
				<ListItemIcon>
					<TrendingUpOutlinedIcon fontSize="small"/>
				</ListItemIcon>
				<Typography variant={'overline'} color={'secondary'}>Experience Letter</Typography>
			</MenuItem>
		</MenuList>
	)
}