import React from 'react';
import {Grid} from "@mui/material";
import CustomInputField from "../CustomInputField";
import DisabledInputField from "../DisabledInputField";

const ELForm = {}

const EditItems = ({control, errors}) => {
  return (
    <>
      <Grid item xs={12} md={7}>
        <CustomInputField
          id={"docNo"}
          label={"Document Number"}
          isRequired={true}
          maxLength={50}
          control={control}
          errors={errors}
          placeholder="HRD/CE/2022/xxx"
          defaultValue={"HRD/CE/2022/"}
          helperText={"e.g. HRD/CE/2022/xxx"}
        />
      </Grid>
    </>
  )
}

const ReadOnlyItems = ({profile}) => {
  return (
    <>
      <Grid item xs={12} md={6}>
        <DisabledInputField id={"empId"} label={"Employee Id"} value={profile.empId}/>
      </Grid>
      <Grid item xs={12} md={6}></Grid>

      <Grid item xs={12} md={6}>
        <DisabledInputField id={"fullName"} label={"Full Name"} value={profile.fullName}/>
      </Grid>
      <Grid item xs={12} md={6}>
        <DisabledInputField id={"designation"} label={"Designation"} value={profile.designation}/>
      </Grid>

      <Grid item xs={12} md={6}>
        <DisabledInputField id={"doj"} label={"Date Of Joining"} value={profile.doj}/>
      </Grid>
      <Grid item xs={12} md={6}>
        <DisabledInputField id={"lwd"} label={"Last Working Date"} value={profile.lwd}/>
      </Grid>
    </>
  )
}

ELForm.EditItems = EditItems
ELForm.ReadOnlyItems = ReadOnlyItems

export default ELForm