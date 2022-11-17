import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {Divider} from "@mui/material";

export default function DocDeleteModal({open, toggleOpen, deleteDocument}) {
  const [disable, setDisable] = React.useState(true)
  const handleChange = (e) => {
    if (e.target.value === "delete") {
      setDisable(false)
    } else {
      setDisable(true)
    }
  }

  return (
    <Dialog open={open} onClose={toggleOpen}>
      <DialogTitle>Delete Document</DialogTitle>
      <Divider />
      <DialogContent>
        <DialogContentText color={"error.main"}>
          Document once deleted cannot be restored. Type "delete" below and click the DELETE button to continue, else click
          cancel.
        </DialogContentText>
        <TextField
          autoFocus={true}
          margin="dense"
          id="confirm"
          type="text"
          fullWidth
          variant="standard"
          placeholder={"delete"}
          onChange={handleChange}
          sx={{mt: 2}}
        />
      </DialogContent>
      <DialogActions sx={{p: 2}}>
        <Button onClick={toggleOpen}>Cancel</Button>
        <Button variant={"contained"} onClick={deleteDocument} disabled={disable}>Delete</Button>
      </DialogActions>
    </Dialog>
  );
}
