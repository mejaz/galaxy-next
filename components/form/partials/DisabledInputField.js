import React from 'react';
import {FormControl, Input, InputLabel} from "@mui/material";

export default function DisabledInputField({id, label, value}) {
  return (
    <FormControl variant="standard">
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <Input
        id={id}
        value={value}
        disabled={true}
      />
    </FormControl>
  )
}