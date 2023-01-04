import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomAlert({severity, msg, isOpen, close, parentStateFunc=null}) {

  const handleClose = () => {
    // setOpen(false);
    parentStateFunc && parentStateFunc(false)
    close()
  };

  return (
    <Snackbar open={isOpen} onClose={handleClose} anchorOrigin={{vertical: "top", horizontal: "center"}}>
      <Alert onClose={handleClose} severity={severity} sx={{width: '100%'}}>
        {msg}
      </Alert>
    </Snackbar>
  );
}
