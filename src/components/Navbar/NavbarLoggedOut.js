import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import FinderLogo from '../../views/design/logo.svg';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
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

  return (
      <AppBar position="static" color="white">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h4" className={classes.title}>
            <img src={FinderLogo} height="70px" width="100px"/>
          </Typography>
          
          <Button color="inherit" className={classes.menuButton} variant="outlined" size="small" href="/login" >Login</Button>
          <Button color='inherit' className={classes.menuButton} variant="outlined" size="small" href="/registration">Register</Button>
        </Toolbar>
      </AppBar>
  );
}