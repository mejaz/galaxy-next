import React from 'react'
import {Box, ListItem, ListItemAvatar, ListItemText, Typography} from "@mui/material";
import List from "@mui/material/List";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import DeleteIcon from '@mui/icons-material/Delete';

export default function AvailableDesignations({dns, deleteDns}) {
  return (
    <Box sx={{width: "100%"}}>
      <Typography variant={'subtitle1'} color={"secondary"} sx={{pb: 1, borderBottom: '1px solid', borderColor: "grey.200"}}>Available Designations</Typography>
      <List dense={false}>
        {
          dns && dns.length > 0
            ? dns.map(obj => {
              return (
                <ListItem
                  key={obj._id}
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete" onClick={() => deleteDns(obj._id)}>
                      <DeleteIcon sx={{color: "warning.main"}}/>
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <Avatar>{obj.name.split("")[0]}</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${obj.name}`}
                  />
                </ListItem>
              )
            })
            : <Typography variant={'body2'} color={"error"}>No Designations Added</Typography>
        }
      </List>
    </Box>
  )
}