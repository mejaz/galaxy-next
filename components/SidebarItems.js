import React from 'react';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import ListItemText from "@mui/material/ListItemText";
import PersonSearchOutlinedIcon from "@mui/icons-material/PersonSearchOutlined";
import Divider from "@mui/material/Divider";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import SummarizeOutlinedIcon from "@mui/icons-material/SummarizeOutlined";
import Box from "@mui/material/Box";
import {useRouter} from "next/router";

export default function SidebarItems() {
  const router = useRouter()
  return (
    <List>
      <ListItem>
        <ListItemButton onClick={() => router.push('/emp/add')}>
          <ListItemIcon>
            <PersonAddOutlinedIcon/>
          </ListItemIcon>
          <ListItemText primary={'Add Employee'}/>
        </ListItemButton>
      </ListItem>
      <ListItem>
        <ListItemButton onClick={() => router.push('/emp/search')}>
          <ListItemIcon>
            <PersonSearchOutlinedIcon/>
          </ListItemIcon>
          <ListItemText
            primary={'Search Employee'}
            secondary={"(Generate Documents)"}
            secondaryTypographyProps={{color: 'red', fontSize: "12px", pt: 1}}
          />
        </ListItemButton>
      </ListItem>
      <Divider/>
      <ListItem>
        <ListItemButton onClick={() => router.push('/designations')}>
          <ListItemIcon>
            <WorkspacePremiumIcon/>
          </ListItemIcon>
          <ListItemText primary={'Designations'}/>
        </ListItemButton>
      </ListItem>
      <Divider/>
      <ListItem>
        <ListItemButton onClick={() => router.push('/docs/search')}>
          <ListItemIcon>
            <SummarizeOutlinedIcon/>
          </ListItemIcon>
          <ListItemText primary={'Search Document'}/>
        </ListItemButton>
      </ListItem>
    </List>
  )
}