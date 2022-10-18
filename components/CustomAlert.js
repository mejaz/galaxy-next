import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomAlert({severity, msg, isOpen, parentStateFunc=null}) {
  const [open, setOpen] = React.useState(isOpen);

  React.useEffect(function() {
    setOpen(isOpen)
  }, [isOpen])

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
    parentStateFunc && parentStateFunc(false)
  };

  return (
    <Snackbar open={open} onClose={handleClose} anchorOrigin={{vertical: "top", horizontal: "center"}}>
      <Alert onClose={handleClose} severity={severity} sx={{width: '100%'}}>
        {msg}
      </Alert>
    </Snackbar>
  );
}
