import React, { useContext, useState } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
//import { useSnackbar } from 'notistack';
import { useForm, Controller } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { IPizza, PizzaFormValues } from '../../../app/models/pizza';
import { observer } from 'mobx-react-lite';
import { Box, DialogActions } from '@material-ui/core';
import { MuiCurrencyFormat } from './../../../app/common/form/MuiCurrencyFormat';
import NumberFormat from 'react-number-format';


interface IProps{
   pizza?: IPizza
}

const PizzaForm: React.FC<IProps> = ({pizza}) => {
  const rootStore = useContext(RootStoreContext);
  const {createPizza, editPizza} = rootStore.pizzaStore;
  const {closeModal} = rootStore.modalStore;
  const [pizzaItem] = useState(new PizzaFormValues());
  console.log(pizzaItem)
  const [] = useState(false);
  if(pizza?.id){

  }
  const { handleSubmit, control, errors: fieldsErrors, reset } = useForm();
 
  
  const handleSubmitForm = (data:any) => {
    pizza?.id? editPizza(data):createPizza(data)
  };
  
  return (
    <Grid container component="main" >
      <form onSubmit={handleSubmit(handleSubmitForm)}>
       <Grid container spacing={2}>
         <Grid item xs={12} sm={6}>
          <FormControl fullWidth variant="outlined">
            <Controller
              name="title"
              as={
                <TextField
                  id="title"
                  helperText={fieldsErrors.title ? fieldsErrors.title.message : null}
                  variant="outlined"
                  label="Title"
                  error={fieldsErrors.title}
                />
              }
              control={control}
              defaultValue={pizza?.id? pizza?.title : ""}
              rules={{
                required: 'Required'
              }}
            />
           </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
          <FormControl fullWidth  variant="outlined">
            <Controller
              name="description"
              as={
                <TextField
                  id="description"
                  helperText={fieldsErrors.description ? fieldsErrors.description.message : null}
                  variant="outlined"
                  label="Description"
                  error={fieldsErrors.descrtiption}
                />
              }
              control={control}
              defaultValue={pizza?.id? pizza?.description : ""}
              rules={{
                required: 'Required'
              }}
            />
          </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
          <FormControl fullWidth  variant="outlined">
            <Controller
              name="priceForSmall"
              as={
                <NumberFormat
                 customInput={TextField}
                 thousandSeparator={true}
                 prefix={"$ "}
                 onValueChange={(v) => {
                 //value without dollar signe
                 console.log(v.value);
            }}
          />
              }
              control={control}
              defaultValue = {pizza?.id? pizza?.priceForSmall : 0}
              helperText={fieldsErrors.priceForMedium ? fieldsErrors.priceForMedium.message : null}
              variant="outlined"
              rules={{
                required: 'Required'
              }}
            />
          </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
          <FormControl fullWidth  variant="outlined">
            <Controller
              name="priceForMedium"
              as={
                <TextField
                  id="priceForMedium"
                  type="number"
                  helperText={fieldsErrors.priceForMedium ? fieldsErrors.priceForMedium.message : null}
                  variant="outlined"
                  label="Price for medium"
                  error={fieldsErrors.priceForMedium}
                />
              }
              control={control}
              defaultValue = {pizza?.id? pizza?.priceForMedium : 0}
              rules={{
                required: 'Required'
              }}
            />
          </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
          <FormControl fullWidth  variant="outlined">
            <Controller
              name="priceForLarge"
              as={
                <TextField
                  id="priceForLarge"
                  type="number"
                  helperText={fieldsErrors.priceForLarge ? fieldsErrors.priceForLarge.message : null}
                  variant="outlined"
                  label="Price for large"
                  error={fieldsErrors.priceForLarge}
                />
              }
              control={control}
              defaultValue = {pizza?.id? pizza?.priceForLarge : 0}
              rules={{
                required: 'Required'
              }}
            />
          </FormControl>
          </Grid>
        <DialogActions style={{marginTop:"1rem"}}>
          <Button autoFocus onClick={closeModal} color="primary">
            Cancel
          </Button>
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </DialogActions>
          </Grid>
        </form>
    </Grid>
  );
};

export default observer(PizzaForm);