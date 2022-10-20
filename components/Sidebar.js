import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import PersonSearchOutlinedIcon from '@mui/icons-material/PersonSearchOutlined';
import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {useRouter} from "next/router";

const drawerWidth = 240;

export default function Sidebar() {
	const router = useRouter()
	return (
		<Drawer
			variant="permanent"
			sx={{
				zIndex: 0,
				width: drawerWidth,
				flexShrink: 0,
				[`& .MuiDrawer-paper`]: {width: drawerWidth, boxSizing: 'border-box'},
			}}
		>
			<Toolbar/>
			<Box sx={{overflow: 'auto', paddingTop: '10px !important'}}>
				<List>
					<ListItem disablePadding>
						<ListItemButton onClick={() => router.push('/emp/add')}>
							<ListItemIcon>
								<PersonAddOutlinedIcon />
							</ListItemIcon>
							<ListItemText primary={'Add Employee'}/>
						</ListItemButton>
					</ListItem>
					<ListItem disablePadding>
						<ListItemButton onClick={() => router.push('/emp/search')}>
							<ListItemIcon>
								<PersonSearchOutlinedIcon />
							</ListItemIcon>
							<ListItemText primary={'Search Employee'}/>
						</ListItemButton>
					</ListItem>
				</List>
				<Divider/>
				<List>
						<ListItem disablePadding>
							<ListItemButton onClick={() => router.push('/certificate/salary')}>
								<ListItemIcon>
									<SummarizeOutlinedIcon />
								</ListItemIcon>
								<ListItemText primary={'Issued Certificates'}/>
							</ListItemButton>
						</ListItem>
				</List>
			</Box>
		</Drawer>
	);
}
