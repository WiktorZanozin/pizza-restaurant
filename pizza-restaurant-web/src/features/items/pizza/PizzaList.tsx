import { Button, Container, Grid, makeStyles } from '@material-ui/core';
import React, { useContext } from 'react'
import { PizzaCard } from './PizzaCard';
import { IPizza } from '../../../app/models/pizza';
import { useTheme } from '@material-ui/core/styles';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { useLocation, withRouter } from 'react-router-dom';
import { RootStoreContext } from '../../../app/stores/rootStore';
import  AddPizzaDialog  from './AddPizzaDialog';
import { observer } from 'mobx-react-lite';
import PizzaForm from './PizzaForm';
import { useEffect } from 'react';


const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
  
    pageContent:{
     
    },
    typography: {
      marginLeft: "58px",
      marginRight: "5px",
      marginBottom: "20px",
      display: 'inline-block'
    },
    cardGrid: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
    },
    button: {
       // ...theme.typography.estimate,
        borderRadius: "50px",
        fontFamily: "Raleway",
        fontWeight: 700,
        color: "white",
        marginRight: "5px",
        marginBottom: "20px",
        fontSize: "1rem",
        height: "45px",
        "&:hover": {
          backgroundColor: theme.palette.secondary.light
        }
      },
  }));

const PizzaList:React.FC = () => {
    const classes = useStyles();
    const rootStore = useContext(RootStoreContext)
    const{pizzaList, loadPizza}=rootStore.pizzaStore
    const{openModal}=rootStore.modalStore
    
    useEffect(()=>{
      loadPizza()
    },[loadPizza])
    

    return (
     <>
    <div style={{ padding: 20 }}>
      <Grid container className={classes.root} spacing={3}>
       <Grid item xs={12}>
        <Grid container justify="center" spacing={5}>
        <Button 
          variant="contained" 
          color="secondary" 
          className={classes.button}
          startIcon={<AddCircleOutlineIcon/>}
          onClick={()=>openModal(<PizzaForm/>, "Add Pizza")}>
           Add new item
        </Button>
        </Grid>
      <Container className={classes.cardGrid} maxWidth="lg">
        <Grid container spacing={4}>
         {pizzaList.map((pizza:IPizza)=>
          <Grid key={pizza.id} item xs={12} sm={6} md={4} lg={3}>
            <PizzaCard pizza={pizza}/>
           </Grid>)}
       </Grid>
       </Container>
      </Grid>
     </Grid>
    </div>
    </>
    )
}
export default withRouter(observer(PizzaList));