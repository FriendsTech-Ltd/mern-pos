import React, { useState } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const Notification = ({ severity, message}) => {
  // eslint-disable-next-line
  const [state, setState] = useState({
    open: true,
    vertical: 'top',
    horizontal: 'right',
  });

  const { vertical, horizontal, open } = state;

  return (
    <div>
      
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        key={vertical + horizontal}
      >
        <Alert severity={severity}>
          {message}
        
        </Alert>
      </Snackbar>
    </div>
  )
}
export default Notification;
