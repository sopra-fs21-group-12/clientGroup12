import {React, useState} from 'react';
import { useHistory } from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import FinderLogo from '../../views/design/logo.svg';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { api, handleError } from '../../helpers/api';
import ForumIcon from '@material-ui/icons/Forum';
import AllInboxIcon from '@material-ui/icons/AllInbox';



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
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 2,
    fontFamily: "Montserrat",
    },
}));



export function NavbarLoggedIn() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const history = useHistory();
  // Drawer
  const theme = useTheme();
  const [openDrawer, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  async function logOut() {
    try {
      const requestBody = JSON.stringify({
        username: localStorage.getItem('username'),
        name: localStorage.getItem('name'),
        id: localStorage.getItem('id'),
      });
      await api.put('/logout', requestBody);
      localStorage.clear();
      history.push('/login');
    }catch (error) {
      alert(`Something went wrong during the logout \n${handleError(error)}`)
    }
  }

  const handleTeam = () => {
    history.push("/team")
  }

  const handleProfile = () => {
    history.push("/profile")
  }

  const handleHome = () =>{
    history.push("/inventory")
  }

  const handleChat = () => {
    history.push("/itemsToChat")
  }

  const handleInfo = () => {
    window.location.replace("https://landingonsopra.herokuapp.com/");
  }
  
  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <div className={classes.root}>
    <CssBaseline />
      <AppBar style={{ background: 'transparent', boxShadow: 'none'}} elevation={0} position="relative" color="transparent"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: openDrawer,
        })}>
        <Toolbar>
          <IconButton  color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, openDrawer && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" className={classes.title}>
          <img src={FinderLogo} height="30px" width="100px" onClick={()=>{handleHome()}} />
          </Typography>
          <IconButton aria-label="Show me the inventory" color="inherit">
            <AllInboxIcon onClick={()=>{handleHome()}} style={{ fontSize: 28 }} onClick={()=>{handleChat()}}/>
            <Typography onClick={()=>{handleHome()}}><navbar-icon>Inventory</navbar-icon></Typography>
          </IconButton>
        
          <IconButton aria-label="show me the chat" color="inherit">
            <ForumIcon style={{ fontSize: 28 }} onClick={()=>{handleChat()}}/>
            <Typography onClick={()=>{handleChat()}}><navbar-icon>Chat</navbar-icon></Typography>
          </IconButton>
          <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle style={{ fontSize: 28 }} />
                <Typography><navbar-icon>Profile</navbar-icon></Typography>

              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                 <MenuItem onClick={handleProfile}>Profile</MenuItem>
                <MenuItem onClick={logOut}>Logout</MenuItem>
                </Menu>
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
                  <GroupIcon onClick={handleTeam}/> 
             </ListItemIcon>
             <ListItemText onClick={handleTeam} >Team</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon style={{minWidth: '30px'}}>
                  <InfoIcon/> 
             </ListItemIcon>
             <ListItemText onClick={handleInfo}>Info</ListItemText>
            </ListItem>
        </List>
        <Divider />
      </Drawer>
      </div>
  );
}