import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function Modal(props) {
  const [open, setOpen] = React.useState(false);
  React.useEffect(()=>{
    setOpen(props.data)
  },[])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    let data = {Click:value, close:false}
    props.HideModal(data)
    setOpen(false);

  };

  return (
    <React.Fragment>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button> */}
      <Dialog
        open={props.data}
        onClose={()=> handleClose(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete Item"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to Delete
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button className='default-btn' onClick={()=> handleClose(true)} autoFocus>Yes</button>
          <button className='default-btn' onClick={()=> handleClose(false)}>Cancel</button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}