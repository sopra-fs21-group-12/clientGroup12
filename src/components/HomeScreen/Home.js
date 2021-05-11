import React from 'react';
import {useHistory, withRouter} from 'react-router-dom';
import {
  Grid,
  makeStyles,
} from "@material-ui/core";


function Home() {

  const history = useHistory();

  return (
    <header>
      Finder Homescreen
    </header>
  )
}
export default withRouter(Home);
