import React from 'react';
import {FormControl, Input, InputAdornment, InputLabel} from "@mui/material";
import FormErrorText from "./FormErrorText";
import {Controller} from "react-hook-form";

export default function CustomMobileNoField({
	 id,
	 label,
	 isRequired,
	 maxLength,
	 control,
	 errors,
	 defaultValue = "",
	 adornVal = ""
 }) {
	return (
		<FormControl variant="standard">
			<InputLabel htmlFor={id} required={isRequired}>{label}</InputLabel>
			<Controller
				name={id}
				control={control}
				rules={{
					required: isRequired,
					maxLength: maxLength,
					validate: {
						isDigits: value => value ? /^\d+$/.test(value) : true,
				}
				}}
				defaultValue={defaultValue}
				render={({field: {onBlur, onChange, value}}) => (
					<Input
						id={id}
						value={value}
						onBlur={onBlur}
						onChange={onChange}
						startAdornment={<InputAdornment position="start">{adornVal}</InputAdornment>}
					/>
				)}/>
			{errors[id]?.type === 'required' && <FormErrorText text={`${label} is Required`}/>}
			{errors[id]?.type === 'maxLength' && <FormErrorText text={`Cannot be more than ${maxLength} chars`}/>}
			{errors[id]?.type === 'isDigits' && <FormErrorText text={`Only digits allowed`}/>}
		</FormControl>
	)
}