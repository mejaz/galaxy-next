import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import SidebarItems from "./SidebarItems";

const drawerWidth = 240;

export default function Sidebar() {

  return (
    <Drawer
      variant="permanent"
      sx={{
        zIndex: 0,
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {width: drawerWidth, boxSizing: 'border-box'},
        display: {xs: 'none', md: 'block'}
      }}
    >
      <Toolbar/>
      <Box sx={{overflow: 'auto', paddingTop: '10px !important'}}>
        <SidebarItems />
      </Box>
    </Drawer>
  );
}
