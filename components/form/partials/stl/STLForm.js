import React from 'react';
import {Grid} from "@mui/material";
import CustomInputField from "../CustomInputField";
import CustomMobileNoField from "../CustomMobileNoField";
import DisabledInputField from "../DisabledInputField";

const STLForm = {}

const EditItems = ({docNo, control, errors}) => {
  return (
    <>
      <Grid item xs={12} md={7}>
        <CustomInputField
          id={"docNo"}
          label={"Document Number"}
          isRequired={true}
          maxLength={100}
          control={control}
          errors={errors}
          placeholder={docNo}
          defaultValue={docNo}
          helperText={`e.g. ${docNo}`}
        />
      </Grid>
      <Grid item xs={12} md={5}></Grid>
      <Grid item xs={12} md={4}>
        <CustomInputField
          id={"accNo"}
          label={"Account Number"}
          isRequired={true}
          maxLength={50}
          control={control}
          errors={errors}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <CustomInputField
          id={"iban"}
          label={"IBAN Number"}
          isRequired={true}
          maxLength={50}
          control={control}
          errors={errors}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <CustomMobileNoField
          id={"salary"}
          label={"Salary"}
          isRequired={true}
          adornVal={"Dhs."}
          maxLength={20}
          control={control}
          errors={errors}
        />
      </Grid>
    </>
  )
}

const ReadOnlyItems = ({profile}) => {
  return (
    <>
      <Grid item xs={12} md={6}>
        <DisabledInputField id={"fullName"} label={"Full Name"} value={profile.fullName}/>
      </Grid>
      <Grid item xs={12} md={6}></Grid>

      <Grid item xs={12} md={6}>
        <DisabledInputField id={"designation"} label={"Designation"} value={profile.designation}/>
      </Grid>
      <Grid item xs={12} md={6}>
        <DisabledInputField id={"doj"} label={"Date Of Joining"} value={profile.doj}/>
      </Grid>

      <Grid item xs={12} md={6}>
        <DisabledInputField id={"nationality"} label={"Nationality"} value={profile.nationality}/>
      </Grid>
      <Grid item xs={12} md={6}>
        <DisabledInputField id={"passNo"} label={"Passport Number"} value={profile.passNo}/>
      </Grid>
    </>
  )
}

STLForm.EditItems = EditItems
STLForm.ReadOnlyItems = ReadOnlyItems

export default STLForm