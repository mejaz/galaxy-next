import React from 'react';
import {Checkbox, FormControl, FormControlLabel, FormHelperText, Input, InputLabel} from "@mui/material";
import FormErrorText from "./FormErrorText";
import {Controller} from "react-hook-form";

export default function CustomCheckbox({
	 id,
	 label,
	 control,
	 errors,
	 defaultValue = true,
		isRequired,
   disable=false,
	 helperText = "",
	additionalOnChange = null,
 }) {
	return (
		<FormControl variant="standard">
			<Controller
				name={id}
				control={control}
				defaultValue={defaultValue}
				render={({field: {onBlur, onChange, value}}) => (
          <FormControlLabel
            id={id}
						value={value}
						onBlur={onBlur}
						onChange={(e) => {
							if (additionalOnChange) {
								onChange(e)
								additionalOnChange()
							} else {
								onChange(e)
							}}}
            control={<Checkbox checked={value} />}
            label={label}
          />
				)}/>
			{helperText && <FormHelperText id="filled-weight-helper-text">{helperText}</FormHelperText>}
		</FormControl>
	)
}