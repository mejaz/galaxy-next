import React from 'react';
import {FormControl, Input, InputLabel, Select} from "@mui/material";
import FormErrorText from "./FormErrorText";
import {Controller} from "react-hook-form";
import MenuItem from "@mui/material/MenuItem";
import {grey} from "@mui/material/colors";

export default function CustomSelectField({
	id,
	label,
	isRequired,
	values,
	control,
	errors,
	valKey='key',
	valLabel='label',
	isReadOnly=false,
	defaultValue = "",
	additionalOnChange=null
 }) {
	return (
		<FormControl variant="standard" sx={{m: 1, minWidth: 120}}>
			<InputLabel id={id} required={isRequired}>{label}</InputLabel>
			<Controller
				name={id}
				control={control}
				rules={{
					required: isRequired,
				}}
				defaultValue={defaultValue}
				render={({field: {onChange, onBlur, value}}) => (
					<Select
						id={id}
						value={value}
						// onBlur={onBlur}
						// onChange={onChange}
						onChange={(e) => {
							if (additionalOnChange) {
								onChange(e)
								additionalOnChange(e.target.value)
							} else {
								onChange(e)
							}
						}}
						disabled={isReadOnly}
					>
						{
							values.map(obj => <MenuItem key={obj[valKey]} value={obj[valKey]}>{obj[valLabel]}</MenuItem>)
						}
					</Select>
				)}/>
			{errors[id]?.type === 'required' && <FormErrorText text={`${label} is Required`}/>}
		</FormControl>
	)
}