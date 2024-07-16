import React from 'react'
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Alert from '@mui/material/Alert';
import { Slide } from '@mui/material';
import { useState } from 'react';
import { useEffect} from 'react';
const Snackbarcompo = (props) => {
  const [open, setOpen] = useState(false)
  useEffect(()=>{
    setOpen(props.data.Click)
  },[])

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        props.openSnackBar(false)
        setOpen(false)
      };
      

    const action = (
        <React.Fragment>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
    );
    
  return (
  <>
    <Snackbar open={props.data.Click} autoHideDuration={2000} onClose={handleClose} TransitionComponent={(props)=> <Slide {...props} direction='left'/>}>
        <Alert severity="primary" variant="filled" color={props.data.msgType} icon={false} onClose={handleClose}>
          {props.data.message}
        </Alert>
    </Snackbar>
    </>
  );
}

export default Snackbarcompo