import React from 'react';
import {useHistory, withRouter} from 'react-router-dom';
import {
  Grid,
  makeStyles,
} from "@material-ui/core";
import FinderLogo from '../../views/design/logo.svg';
import Typography from "@material-ui/core/Typography";
import Introduction from "./sections/introduction";
import InventorySection from "./sections/InventorySection";
import ChatSection from "./sections/ChatSection";
import GameSection from "./sections/GameSection";
import Footer from "./sections/Footer";
import SwipeSection from "./sections/SwipeSection";

function HomePage() {

  const history = useHistory();

  return (
    <div>
      <Grid container={true}>
        <Grid item={true} xs={4} style={{ padding: 30 }}>
          <img src={FinderLogo} alt={undefined}/>
        </Grid>
        <Grid item xs={4}>
        </Grid>
        <Grid item xs={4}>

        </Grid>
      </Grid>
      <Grid container={true} alignItems="flex-end">
        <Grid item xs={12}>
          <Typography variant="body1">
            find and swap items with the community
          </Typography>
        </Grid>
      </Grid>
      <Grid container={true} alignItems="center">
        <Introduction/>
        <InventorySection/>
        <SwipeSection/>
        <ChatSection/>
        <GameSection/>
        <Footer/>
      </Grid>
    </div>
  )
}
export default withRouter(HomePage);
