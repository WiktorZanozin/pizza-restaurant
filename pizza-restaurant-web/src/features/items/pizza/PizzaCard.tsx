import { Card, Tooltip, CardMedia, CardContent, Typography, CardActions, Button, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from '@material-ui/core'
import React, { useContext } from 'react'
import { IPizza } from '../../../app/models/pizza'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import cheese from '../../../assets/cheese.svg';
import { PizzaStatus } from '../../../app/models/pizzaStatus';
import PizzaForm from './PizzaForm';
import { RootStoreContext } from '../../../app/stores/rootStore'
import  DeleteModal  from '../../../app/common/modals/DeleteModal'
import { useLocation, useParams } from 'react-router-dom'

const useStyles = makeStyles({
    root: {
      maxWidth: 300,
      flexGrow: 1,
      //border: "1px solid black"
      boxShadow: "0 0 10px rgba(0,0,0,0.2)",
      borderRadius: "0px",
      fixed: true
    },
    media: {
       height: 260,
       width: 290,
    },
    table: {
      maxWidth: "xs",
      paddingTop: "15px",
      borderRadius: "0px",
    },
    cardActions:{
      marginLeft:"10px"
    },
    description:{
      marginTop:"1rem",
      marginBottom:"1rem"
    },
  });
  
interface IProps{
    pizza: IPizza
}

export const PizzaCard:React.FC<IProps> = ({pizza}) => {
    const classes = useStyles();
    const rootStore = useContext(RootStoreContext);
    const{openModal}=rootStore.modalStore;
    const{deletePizza} = rootStore.pizzaStore;

    function createData( small: number, medium: number, large: number) {
        return {small, medium, large };
    }
    const rows = [
      createData(pizza.priceForSmall, pizza.priceForMedium, pizza.priceForLarge),
    ];
    return (
        <Card className={classes.root}>
          <CardMedia
            className={classes.media}
            image={cheese}
            title={pizza.title}
          />
        <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {pizza.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" className={classes.description}>
             {pizza.description}
            </Typography>
            <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Small</TableCell>
            <TableCell align="right">Medium</TableCell>
            <TableCell align="right">Large</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow >
              <TableCell align="right">{row.small +"$"}</TableCell>
              <TableCell align="right">{row.medium +"$"}</TableCell>
              <TableCell align="right">{row.large +"$"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
          </CardContent>
        <CardActions className={classes.cardActions}>
        <Tooltip title="Edit">
        <IconButton 
          color="primary" 
          aria-label="Edit" 
          component="span" 
          onClick={()=>openModal(<PizzaForm pizza={pizza}/>, "Edit Pizza")}
          >
           <EditIcon/>
        </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton 
           color="primary" 
           aria-label="Delete" 
           component="span" 
           onClick={() => openModal(<DeleteModal deleteFunction = {deletePizza} id = {pizza.id}/>, "Delete Pizza")}

          //  //(e: React.MouseEvent<HTMLButtonElement>)=>deletePizza(e, pizza.id)}
          >
           <DeleteIcon/>
        </IconButton>
        </Tooltip>
          {pizza.status===PizzaStatus.UNAVAILABLE?
          <VisibilityOffIcon style={{ marginLeft: "7em"}}/>:null}
        </CardActions>
      </Card>
    )
}
