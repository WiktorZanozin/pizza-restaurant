
import { TextField, Button, Grid, makeStyles } from '@material-ui/core'
import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react'
import { RootStoreContext } from '../../../app/stores/rootStore';
import {
  combineValidators,
  isRequired,
  composeValidators,
  hasLengthGreaterThan
} from 'revalidate';
import { Field, Form as FinalForm} from 'react-final-form';
import { PizzaFormValues } from '../../../app/models/pizza';
import { withRouter } from 'react-router-dom';

const validate = combineValidators({
  title: isRequired({ message: 'The event title is required' }),
  description: composeValidators(
    isRequired('Description'),
    hasLengthGreaterThan(4)({
      message: 'Description needs to be at least 5 characters'
    })
  )(),
  priceForSmall: isRequired('priceForSmall'),
  priceForMedium: isRequired('priceForMedium'),
  priceForLarge: isRequired('priceForLarge'),
});

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


const AddPizzaDialog: React.FC = () => {
    // const rootStore = useContext(RootStoreContext);
  const rootStore=useContext(RootStoreContext);
  const {createPizza} = rootStore.pizzaStore;
  const {closeModal} = rootStore.modalStore;
  const [pizzaItem] = useState(new PizzaFormValues());
  console.log(pizzaItem)
  const [] = useState(false);

  // useEffect(() => {
  //   if (match.params.id) {
  //     setLoading(true);
  //     loadPizza(match.params.id)
  //       .then(pizza => {
  //         setPizzaItem(new PizzaFormValues(pizzaItem));
  //       })
  //       .finally(() => setLoading(false));
  //   }
  // }, [loadPizza, match.params.id]);
  const sleep = (ms:any) => new Promise(resolve => setTimeout(resolve, ms))


  const handleFinalFormSubmit = async(values: any) => {
    // console.log(values)
    // const { date, time, ...pizzaItem } = values;
    // if (!pizzaItem.id) {
    //   let newPizza = {
    //     ...pizzaItem,
    //   };
    //   console.log(newPizza)
    //   createPizza(newPizza);
    // // } else {
    // //   editPizza(newPizza);
 //   }

 
  await sleep(300)
  console.log(values)

  };

    return (
      <FinalForm
        validate={validate}
        initialValues={pizzaItem}
        onSubmit={handleFinalFormSubmit}
        render={({ handleSubmit, pristine, submitting}) => (
         <form onSubmit={handleSubmit}>
           <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
            <Field
                variant="outlined"
                fullWidth
                required
                name="title"
                component={TextField}
                type="text"
                label="Name"
                autoComplete="title"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
            <Field
                variant="outlined"
                required
                fullWidth
                component={TextField}
                id="description"
                label="Description"
                name="description"
                autoComplete="description"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="small"
                label="Price for small"
                type="number"
                name="priceForSmall"
                autoComplete="priceForSmall"
              />
            </Grid>
            <Grid item xs={4}>
            <TextField
                variant="outlined"
                required
                fullWidth
                id="medium"
                label="Price for medium"
                type="number"
                name="priceForMedium"
                autoComplete="priceForSmall"
              />
            </Grid>
            <Grid item xs={4}>
            <TextField
                variant="outlined"
                required
                fullWidth
                id="large"
                label="Price for large"
                type="number"
                name="priceForLarge"
                autoComplete="priceForSmall"
              />
            </Grid>
            <Grid item style={{ marginTop: 16 }}>
                  <Button
                    type="button"
                    variant="contained"
                    onClick={closeModal}
                    disabled={submitting || pristine}
                  >
                    Reset
                  </Button>
                </Grid>
                <Grid item style={{ marginTop: 16 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                   // disabled={submitting}
                  >
                    Submit
                  </Button>
                  </Grid>
                </Grid>
        </form>)}
        />  
    )
}

export default withRouter(observer(AddPizzaDialog))
