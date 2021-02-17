import './App.css';
import { Navbar } from '../../features/nav/Navbar';
import React, { useContext, useEffect, useState } from 'react';
import { Grid, ThemeProvider} from '@material-ui/core'

import theme from '../ui/Theme';
import { BrowserRouter, Route, RouteComponentProps, Switch, withRouter } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import ModalContainer from '../common/modals/ModalContainer';
import PizzaList from '../../features/items/pizza/PizzaList';
import Footer from '../../features/footer/Footer';
import { ToastContainer } from 'react-toastify';

const App: React.FC<RouteComponentProps> =({location})=>{
  // useEffect(()=>{
  //   pizzaAdminStore.loadPizza()
  //   console.log(Array.from(pizzaAdminRegistry.values()).map((pizza:any)=>pizza.title))
  // },[pizzaAdminStore])
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [value, setValue] = useState(0);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter> 
         <Navbar  
          value={value}
          setValue={setValue}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}/>
        <ToastContainer position='bottom-right'/>
        <ModalContainer/>
        <Switch>
          <Route exact path='/pizza' component={PizzaList} />
        </Switch>
        <Footer/>
      </BrowserRouter>  
    </ThemeProvider>
  );
}

export default withRouter(observer (App));
