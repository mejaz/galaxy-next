import React from 'react';
import {Grid} from "@mui/material";
import CustomInputField from "../CustomInputField";
import CustomMobileNoField from "../CustomMobileNoField";
import DisabledInputField from "../DisabledInputField";

const SCForm = {}

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
      <Grid item xs={12} md={5}>
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
      <Grid item xs={12} md={7}>
        <CustomInputField
          id={"addressTo"}
          label={"Address This Document To"}
          isRequired={false}
          maxLength={200}
          control={control}
          errors={errors}
          placeholder={""}
          defaultValue={""}
          helperText={`e.g. FAB Bank. Hint - if left blank, document will default to "To whomsoever, it may concern"`}
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
        <DisabledInputField id={"nationality"} label={"Nationality"} value={profile.nationality}/>
      </Grid>
      <Grid item xs={12} md={6}>
        <DisabledInputField id={"passNo"} label={"Passport Number"} value={profile.passNo}/>
      </Grid>
    </>
  )
}

SCForm.EditItems = EditItems
SCForm.ReadOnlyItems = ReadOnlyItems

export default SCForm
