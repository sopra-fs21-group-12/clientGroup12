import {React,useState,useEffect} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import FinderLogo from '../../views/design/logo.svg';
import { useHistory } from "react-router-dom";


// App Drawer
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import InfoIcon from '@material-ui/icons/Info';
import GroupIcon from '@material-ui/icons/Group';

const drawerWidth = 100;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display:"flex"
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },

    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
  
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(0),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },

  menuButton: {
    marginRight: theme.spacing(1),
    fontFamily: "Newsreader",


  },
  title: {
    flexGrow: 2,
    fontFamily: "Newsreader"

}
}));





export function NavbarLoggedOut() {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const [openDrawer, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleTeam = () => {
    history.push("/team")
  }

  return (
    <div className={classes.root}>
    <CssBaseline />
      <AppBar position="flex" color="white"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: openDrawer,
        })}>
        <Toolbar>
        <IconButton  color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, openDrawer && classes.hide)}
          >            <MenuIcon />
          </IconButton>
          <Typography variant="h4" className={classes.title}>
            <img src={FinderLogo} height="30px" width="100px"/>
          </Typography>
          
          <Button color="inherit" className={classes.menuButton} variant="outlined" size="small" href="/login" >Login</Button>
          <Button color='inherit' className={classes.menuButton} variant="outlined" size="small" href="/registration">Register</Button>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={openDrawer}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
            <ListItem>
              <ListItemIcon style={{minWidth: '30px'}}>
                  <GroupIcon onClick={handleTeam} /> 
             </ListItemIcon >
             <ListItemText onClick={handleTeam} >Team</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon style={{minWidth: '30px'}}>
                  <InfoIcon/> 
             </ListItemIcon>
             <ListItemText >Info</ListItemText>
            </ListItem>
        </List>
        <Divider />
      </Drawer>
      </div>
  );
}