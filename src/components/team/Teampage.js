import React from 'react'
import {
    Button,
    Grid,
    makeStyles,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Typography
  } from "@material-ui/core";
  import Navbar from "../Navbar/Navbar"
  import GitHubIcon from '@material-ui/icons/GitHub';
import {withRouter} from "react-router-dom";


  const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 2,
        padding: theme.spacing(2),
        maxWidth: 340
    },
    Card: {
      width: 300,
      margin: 'auto'
    }
}))





function TeamPage() {
    const classes = useStyles();

    return (
      <Grid
      alignItems="flex start"
      spacing={0}
      xs={12}>
        <Navbar/>
        <Grid xs={12}>
        <Grid
        spacing={0}
        container
        justify="center"
      >
          <header> The finder. Team </header>
        <Grid container
                spacing={0}
                direction="row"
                justify="center"
                alignItems="center">
        <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          style={{height: 0, paddingTop: '70%'}}
          alt="Joel"
          image="https://mypicturegallerydshush.s3.eu-central-1.amazonaws.com/0/Joel.jpeg"
          title="Joel"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Joël
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            I am the Boss of the crew. I decide what has to be done. If I don't like it, it will be changed!
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      <Button size="small"
        color="primary"
        startIcon={<GitHubIcon />}
        href="https://github.com/joelruettimann"
        >
         Github
        </Button>
      </CardActions>
    </Card>
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          style={{height: 0, paddingTop: '70%'}}
          alt="Contemplative Reptile"
          image="https://mypicturegallerydshush.s3.eu-central-1.amazonaws.com/0/Bildschirmfoto+2021-05-29+um+23.14.25.png"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Mauro
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
           The photo was taken after a hard day of integration testing. May the bugs be destroyed for ever!
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small"
        color="primary"
        startIcon={<GitHubIcon />}
        href="https://github.com/messias-des-coden"
        >
         Github
        </Button>

      </CardActions>
    </Card>
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          style={{height: 0, paddingTop: '70%'}}
          alt="Contemplative Reptile"
          image="https://mypicturegallerydshush.s3.eu-central-1.amazonaws.com/0/dennis.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Dennis
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          I don't care as much as how the application looks, but rather that it works. The logic is what matters !

          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      <Button size="small"
        color="primary"
        startIcon={<GitHubIcon />}
        href="https://github.com/dennisshushack"
        >
         Github
        </Button>
      </CardActions>
    </Card>
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          style={{height: 0, paddingTop: '70%'}}
          alt="Contemplative Reptile"
          image="https://mypicturegallerydshush.s3.eu-central-1.amazonaws.com/0/filip.jpeg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Filip
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          I don't like dirty code. I want to have it clean. Some may call me the Code-Cleaner.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      <Button size="small"
        color="primary"
        startIcon={<GitHubIcon />}
        href="https://github.com/filiptrenuzh"
        >
         Github
        </Button>
      </CardActions>
    </Card>
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
         style={{height: 0, paddingTop: '70%'}}
         alt="Contemplative Reptile"
          // Please send me foto  Onur
          image="https://mypicturegallerydshush.s3.eu-central-1.amazonaws.com/0/Bildschirmfoto+2021-05-29+um+23.05.11.png"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Onur
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            I am Onur the great. My supreme styling makes the difference in the application. Style matters
            !
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      <Button size="small"
        color="primary"
        startIcon={<GitHubIcon />}
        href="https://github.com/otopalak"
        >
         Github
        </Button>
      </CardActions>
    </Card>
        </Grid>
        </Grid>
        </Grid>
        </Grid>
    )
}
export default withRouter(TeamPage);
