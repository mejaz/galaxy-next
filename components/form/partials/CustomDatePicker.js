import React, {useEffect} from "react";
import {FormControl, TextField} from "@mui/material";
import {Controller} from "react-hook-form";
import {DesktopDatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import DateFnsUtils from "@date-io/date-fns";
import FormErrorText from "./FormErrorText";

export default function CustomDatePicker({
 id,
 label,
 control,
 minDate,
 maxDate,
 errors,
 isRequired,
 defaultValue=''
}) {
	return (
		<FormControl variant="standard">
			<Controller
				control={control}
				name={id}
				rules={{
					required: isRequired
				}}
				defaultValue={defaultValue}
				render={({field: {onChange, value}}) => {
					return (
						<LocalizationProvider dateAdapter={DateFnsUtils}>
							<DesktopDatePicker
								label={label}
								inputFormat="dd/MM/yyyy"
								value={value}
								onChange={onChange}
								minDate={minDate}
								maxDate={maxDate}
								renderInput={(params) => (
									<TextField
										sx={{marginTop: "7px !important", marginBottom: "0px !important"}}
										variant={"standard"}
										{...params}
									/>
								)}
							/>
						</LocalizationProvider>
					);
				}}
			/>
			{errors[id]?.type === 'required' && <FormErrorText text={`${label} is Required`}/>}
		</FormControl>
	);
}