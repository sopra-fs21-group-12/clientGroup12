import {React,useState,useEffect} from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import FinderLogo from '../../views/design/logo.svg';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { api, handleError } from '../../helpers/api';
import ForumIcon from '@material-ui/icons/Forum';
import HomeIcon from '@material-ui/icons/Home';





const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display:"flex"
  },

  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 2,
    fontFamily: "Monserat",
    },
}));



export function NavbarLoggedIn() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const history = useHistory();

  

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





  const handleProfile = () => {
    history.push("/profile")
  }

  const handleHome = () =>{
    history.push("/inventory")
  }

  const handleChat = () => {
    history.push("/itemsToChat")
  }


  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
      <AppBar position="static" color="white">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" className={classes.title}>
          <img src={FinderLogo} height="70px" width="100px" onClick={()=>{handleHome()}} />
          </Typography>
          <IconButton aria-label="Show me the inventory" color="inherit">
            <HomeIcon onClick={()=>{handleHome()}} style={{ fontSize: 28 }} onClick={()=>{handleChat()}}/>
            <Typography onClick={()=>{handleHome()}} variant="body2">Home</Typography>
          </IconButton>
        
          <IconButton aria-label="show me the chat" color="inherit">
            <ForumIcon style={{ fontSize: 28 }} onClick={()=>{handleChat()}}/>
            <Typography onClick={()=>{handleChat()}} variant="body2">Chat</Typography>
          </IconButton>
          <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle style={{ fontSize: 28 }} />
                <Typography variant="body2">Profile</Typography>

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
  );
}