import {Chip} from "@mui/material";
import React from "react";


const CustomChip = ({company, backgroundColor, color}) => {
  return (
    <Chip
      size={"small"}
      label={company.toUpperCase()}
      sx={{
        backgroundColor,
        color,
        position: 'absolute',
        top: 12,
        ml: {md: 1, xs: 9},
        fontWeight: 900,
        letterSpacing: 1,
        fontSize: '10px'
      }}
    />
  )
}

export default CustomChip
