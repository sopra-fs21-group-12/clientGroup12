import React from 'react';
import { withRouter } from 'react-router-dom';

import { Grid, Paper,} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Panel } from 'rsuite';
import SwipingGame from "./SwipingGame";

const useStyles = makeStyles((theme) => ({
    description: {
        display: 'flex',
        flexDirection: 'column',
        paddingTop: 50,
        padding: 20,
        height: "40em"
    },
    swipe: {
        height: "25em"
    },
    userItem:{
        height: "10em"
    },
}));

function SwipePage(props) {
    const {id} = props.match.params
    const classes = useStyles();

    return (
        <Grid container justify="center" spacing={4}>
            <Grid item xs={12}/>
            <Grid item xs={12}/>

            <Grid item xs={4}>
                <Panel shaded>
                    <Paper className={classes.description} elevation ={0}>
                        <h2>
                            Title of Item
                        </h2>
                        <body>

                        </body>
                    </Paper>
                </Panel>
            </Grid>
            <Grid item xs={6}>
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <Panel shaded>
                            <Paper className={classes.swipe} elevation ={0}>
                            </Paper>
                        </Panel>
                    </Grid>
                    <Grid item xs={12}>
                        <Panel shaded>
                            <Paper className={classes.userItem} elevation ={0}>

                            </Paper>
                        </Panel>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );

}

export default withRouter(SwipePage);