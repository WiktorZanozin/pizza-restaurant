
import React, { useContext } from 'react';
import { RootStoreContext } from '../../stores/rootStore';
import { observer } from 'mobx-react-lite';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  dialogWrapper: {
      padding: theme.spacing(2),
      position: 'absolute',
      top: theme.spacing(5)
  },
  dialogTitle: {
      paddingRight: '0px'
  }
}))

const ModalContainer = () => {
    const classes = useStyles();
    const rootStore = useContext(RootStoreContext);
    const {modal: {open, body, title}, closeModal} = rootStore.modalStore;
    
  return (
    <Dialog open={open} onClose={closeModal} fullWidth={true} maxWidth="sm" classes={{ paper: classes.dialogWrapper }}>
       <DialogTitle className={classes.dialogTitle}>
          <div style={{ display: 'flex' }}>
            <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
              {title}
            </Typography>
          </div>
        </DialogTitle>
      <DialogContent>{body}</DialogContent>
    </Dialog>
  )
};

export default observer(ModalContainer)