import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {Box, Divider, FormHelperText, Input, Typography} from "@mui/material";
import {useForm} from "react-hook-form";
import FormErrorText from "../form/partials/FormErrorText";
import {LoadingButton} from "@mui/lab";

export default function FileUploadModal({open, toggleOpen, name, title, allowedExt, handleUpload, loading}) {
  // react hook form config
  const {register, handleSubmit, formState: {errors}} = useForm();
  return (
    <Dialog open={open} onClose={toggleOpen}>
      <DialogTitle>{title}</DialogTitle>
      <Divider/>
      <Box component={"form"} enctype={"multipart/form-data"} onSubmit={handleSubmit(handleUpload)}>
        <DialogContent>
          <DialogContentText>
            Choose the signed document to upload
          </DialogContentText>
          <FormHelperText sx={{color: 'error.main'}}>Only {allowedExt.join(", ")} ext allowed</FormHelperText>
          <Box sx={{pt: 2}}>
            <Input
              {...register(name, {
                required: true,
                validate: {
                  fileType: value => allowedExt.includes(`.${value[0].name.split(".").reverse()[0]}`) ? true : "File ext not supported"
                }
              }) }
              type={'file'}
              disableUnderline={true}
            />
            {errors && errors[name]?.type === 'required' && <FormErrorText text={`File is Required`}/>}
            {errors && errors[name]?.type === 'fileType' && <FormErrorText text={errors[name].message}/>}
          </Box>
        </DialogContent>
        <DialogActions sx={{p: 2}}>
          <Button onClick={toggleOpen} size={'small'}>Cancel</Button>
          <LoadingButton loading={loading} variant={"contained"} type={'submit'} size={'small'}>Upload</LoadingButton>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
