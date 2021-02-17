import { Button, DialogActions, DialogContentText } from '@material-ui/core'
import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react'
import { RootStoreContext } from '../../stores/rootStore';

interface IProps{
  deleteFunction: any,
  id: number
}
const DeleteModal:React.FC<IProps> = ({id, deleteFunction}) => {

  const rootStore = useContext(RootStoreContext);
  const {closeModal} = rootStore.modalStore;
    return (
        <>
        <DialogContentText id="alert-dialog-description">
           Are you sure to delete this record?
        </DialogContentText>
        <DialogActions style={{marginTop:"1rem"}}>
         <Button autoFocus onClick={closeModal} color="primary">
           Cancel
         </Button>
         <Button variant="contained" color="primary" onClick = {(e: React.MouseEvent<HTMLButtonElement>)=>deleteFunction(e, id)}>
           Submit
         </Button>
       </DialogActions>
       </>
    )
}

export default observer(DeleteModal);