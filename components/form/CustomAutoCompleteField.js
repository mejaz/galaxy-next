import React from 'react';
import {FormControl, Input, InputLabel, Autocomplete, TextField} from "@mui/material";
import FormErrorText from "./FormErrorText";
import {Controller} from "react-hook-form";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";

export default function CustomAutoCompleteField({
																									id,
																									label,
																									isRequired,
																									values,
																									control,
																									errors,
																									valKey = 'key',
																									valLabel = 'label',
																									isReadOnly = false,
																									defaultValue = ""
																								}) {
	return (
		<FormControl variant="standard" sx={{minWidth: 120, mt: '0 !important'}}>
			<Controller
				name={id}
				control={control}
				rules={{
					required: isRequired,
				}}
				defaultValue={defaultValue}
				render={({field: {onChange, value}}) => (
					<Autocomplete
						options={values}
						id={id}
						autoHighlight
						// defaultValue={'ARE'}
						getOptionLabel={(option) => option.name}
						onChange={onChange}
						renderOption={(props, option) => (
							<Box component="li" value={option.iso3} {...props} >
								{option.name}
							</Box>
						)}
						renderInput={(params) => (
							<TextField
								autoComplete={'off'}
								variant={'standard'}
								label={label}
								{...params}
							/>
						)}
					/>
				)}/>
			{errors[id]?.type === 'required' && <FormErrorText text={`${label} is Required`}/>}
		</FormControl>
	)
}