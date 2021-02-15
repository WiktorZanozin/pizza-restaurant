import { Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, Button, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import React from 'react'
import { IPizza } from '../../../app/models/pizza'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import cheese from '../../../assets/cheese.svg';
import { PizzaStatus } from '../../../app/models/pizzaStatus'

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
    pizza:IPizza
}

export const PizzaCard:React.FC<IProps> = ({pizza}) => {
    const classes = useStyles();
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
          <EditIcon/>
          <DeleteIcon/>
          {pizza.status===PizzaStatus.UNAVAILABLE?
          <VisibilityOffIcon style={{ marginLeft: "7em"}}/>:null}
        </CardActions>
      </Card>
    )
}
