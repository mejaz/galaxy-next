import React from 'react';
import {FormControl, Input, InputLabel} from "@mui/material";
import FormErrorText from "./FormErrorText";
import {Controller} from "react-hook-form";

export default function CustomEmailField({
	 id,
	 label,
	 isRequired,
	 maxLength,
	 control,
	 errors,
	 defaultValue = ""
 }) {
	return (
		<FormControl variant="standard">
			<InputLabel htmlFor={id} required={isRequired}>{label}</InputLabel>
			<Controller
				name={id}
				control={control}
				rules={{
					required: isRequired,
					maxLength: maxLength
				}}
				defaultValue={defaultValue}
				render={({field: {onBlur, onChange, value}}) => (
					<Input
						id={id}
						value={value}
						onBlur={onBlur}
						onChange={onChange}
					/>
				)}/>
			{errors[id]?.type === 'required' && <FormErrorText text={`${label} is Required`}/>}
			{errors[id]?.type === 'maxLength' && <FormErrorText text={`Cannot be more than ${maxLength} chars`}/>}
		</FormControl>
	)
}