import { AppBar, Button, Tabs, MenuItem, makeStyles, Menu, Tab, Toolbar, Typography, useMediaQuery, useTheme, IconButton, List, ListItem, ListItemText, SwipeableDrawer, withStyles, MenuProps } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import logo from '../../assets/logo.svg';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import PhoneIcon from '@material-ui/icons/Phone';
import HomeIcon from '@material-ui/icons/Home';
import LocalDiningIcon from '@material-ui/icons/LocalDining';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import LocalPizzaIcon from '@material-ui/icons/LocalPizza';
import LocalDrinkIcon from '@material-ui/icons/LocalDrink';
import FastfoodIcon from '@material-ui/icons/Fastfood';

const useStyles = makeStyles(theme=>({
  header: {
    backgroundColor: "rgb(215,54,26)",
    minHeight: "5em",
    zIndex: theme.zIndex.modal + 1,
  },
  logo: {
    height: "4em",
    verticalAlign: "middle",
    // [theme.breakpoints.down("md")]: {
    //   height: "7em"
    // },
    // [theme.breakpoints.down("xs")]: {
    //   height: "5.5em"
    // },
  },
  logoTitle:{
    marginLeft:"350",
    justifyContent: "cental",
    whiteSpace: "nowrap"
  },
  logoContainer: {
    
    "&:hover": {
      backgroundColor: "transparent"
    }
  },
  menu: {
    backgroundColor: "rgb(215,54,26)",
    color: "white",
    borderRadius: "0px"
  },
  menuItem: {
    fontFamily: "Raleway",
  //  textTransform: "none",
    fontWeight: 700,
    fontSize: "1rem",
    opacity: 0.7,
    "&:hover": {
      opacity: 1,
    }
  },
  tab: {
    background: "rgb(215,54,26)",
    fontFamily: "Raleway",
    textTransform: "none",
    fontWeight: 700,
    fontSize: "1rem",
    minWidth: 10,
    marginLeft: "25px"
  },

  tabContainer: {
     marginLeft: "380px"
  },
  toolbarMargin: {
    marginBottom: "2em",
    drawerIcon: {
      height: "50px",
      width: "50px"
    },
   },
}))
interface IProps{
  value: number,
  setValue: any,
  selectedIndex: number,
  setSelectedIndex: any
}

export const Navbar: React.FC<IProps> = (props) => {

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const classes = useStyles();
  const iOS = process.platform && /iPad|iPhone|iPod/.test(navigator.userAgent);


  const [openDrawer, setOpenDrawer] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openMenu, setOpenMenu] = React.useState(false);

  const handleChange = (e:any, newValue:any) => {
    props.setValue(newValue);
  }

  const handleClick = (e:any) => {
    setAnchorEl(e.currentTarget);
    setOpenMenu(true);
  }

  const handleMenuItemClick = (e:any, i:any) => {
    setAnchorEl(null);
    setOpenMenu(false);
    props.setSelectedIndex(i);
  }

  const handleClose = (e:any) => {
    setAnchorEl(null);
    setOpenMenu(false);
  }

  const StyledMenu = withStyles({
    paper: {
     // border: '1px solid #d3d4d5',
      backgroundColor: "rgb(215,54,26)",
      color: "white",
      borderRadius: "0px",
      fontFamily: "Raleway",
      fontWeight: 700
    },
  })((props: MenuProps) => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      {...props}
    />
  ));
  
  // const StyledMenuItem = withStyles((theme) => ({
  //   root: {
  //     '&:focus': {
  //       backgroundColor: theme.palette.primary.main,
  //       '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
  //         color: theme.palette.common.white,
  //       },
  //     },
  //   },
  // }))(MenuItem);

  const menuOptions = [
    {name: 'Pizza', link: '/pizza', activeIndex: 1, selectedIndex: 0, icon:<LocalPizzaIcon/>},
    {name: 'Snacks', link: '/snacks', activeIndex: 1, selectedIndex: 1, icon:<FastfoodIcon/>},
    {name: 'Drinks', link: '/drinks', activeIndex: 1, selectedIndex: 2, icon:<LocalDrinkIcon/>},
  ];

  const routes = [
    {name: 'Home', link: '/', activeIndex: 0, icon: <HomeIcon/>, selectedIndex: undefined},
    {
      name: 'Items',
      link: '/pizza',
      activeIndex: 1,
      ariaOwns: anchorEl ? "simple-menu" : undefined,
      ariaPopup: anchorEl ? "true" as "true" : undefined,
      icon: <LocalDiningIcon/>,
      selectedIndex: undefined,
      mouseOver: (event:any) => handleClick(event)
   },
    {name: 'Orders', link: '/orders', activeIndex: 2, icon: <ShoppingCartIcon/>, selectedIndex: undefined}
  ];

  useEffect(() => {
    [...menuOptions, ...routes].forEach((route) => {
      switch(window.location.pathname) {
        case `${route.link}`:
          if (props.value !== route.activeIndex ) {
            props.setValue(route.activeIndex);
           // route.hasOwnProperty('selectedIndex')? {...route}
             if (route.selectedIndex && route.selectedIndex !== props.selectedIndex) {
                 props.setSelectedIndex(route.selectedIndex);
               }
          }
        break;
        default:
        break;
      }
    });
  }, [props.value, menuOptions, props.selectedIndex, routes, props])

  const tabs = (
    <React.Fragment>
      <Tabs
        onChange={handleChange}
        value={props.value}
        className={classes.tabContainer}
        indicatorColor = {undefined}
      >
       {routes.map((route, index) => (
        <Tab
          aria-owns={route.ariaOwns}
          aria-haspopup={route.ariaPopup}
          className={classes.tab}
          component={Link}
          onMouseOver={route.mouseOver}
          key={`${route}${index}`}
          to={route.link}
          label={route.name}
          icon={route.icon}
        />
      ))} 
      </Tabs>
      
      {/* <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleClose}
        classes={{paper: classes.menu}}
        MenuListProps={{onMouseLeave: handleClose}}
        elevation={0}
        style={{zIndex: 1302}}
        keepMounted
      > */}
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={openMenu}
        onClose={handleClose}
        MenuListProps={{onMouseLeave: handleClose}}
        style={{zIndex: 1302}}>
        {menuOptions.map((option, i) => (
          <MenuItem
            key={option.name + i}
            onClick={(event:any) => {handleMenuItemClick(event, i); handleClose(event); props.setValue(1);}}
            component={Link}
            to={option.link}
            classes={{ root: classes.menuItem }}
            selected={i === props.selectedIndex && props.value === 1}
          >
           <span style={{marginRight:"5px"}}>
             {option.icon}
            </span>
          <ListItemText primary={option.name}/>
          </MenuItem>
        ))}
      </StyledMenu>
    </React.Fragment>
  )
 
    return (
      <>
      <AppBar position="static" className={classes.header}>
        <Toolbar>
            <Button
              component={Link}
              to="/"
              disableRipple
              className={classes.logoContainer}
              onClick={() => {console.log('click')}}
            >
              <img className={classes.logo} alt="company logo" src={logo} />
            </Button>
            
          <Typography variant="h3" className={classes.logoTitle} >
            Pizza Restaurant
          </Typography>
          {tabs}
        </Toolbar>
      </AppBar>
      <div className={classes.toolbarMargin} />
      </>
    )
}
