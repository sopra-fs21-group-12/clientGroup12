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


  const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 2,
        padding: theme.spacing(2),
        maxWidth: 340
    }
}))
  


export default function Teampage() {
    const classes = useStyles();

    return (
        <Grid
        container
        spacing={3}
        xs={12}
        justify="center"
        component="main"
      >
          <header> The finder. Team </header>
        <Grid container
                spacing={4}
                direction="row"
                justify="center"
                alignItems="center">
        <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Dennis"
          height="140"
          image=""
          title="Dennis"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Dennis
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Hey there :D Hope you are enjoying our Finder. application. I have mainly been
            working on the backend of the project, making sure the Logic works.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image=""
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Dennis
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Hey there :D Hope you are enjoying our Finder. application. I have mainly been
            working on the backend of the project, making sure the Logic works.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image=""
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Dennis
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Hey there :D Hope you are enjoying our Finder. application. I have mainly been
            working on the backend of the project, making sure the Logic works.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image=""
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Dennis
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Hey there :D Hope you are enjoying our Finder. application. I have mainly been
            working on the backend of the project, making sure the Logic works.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image=""
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Dennis
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Hey there :D Hope you are enjoying our Finder. application. I have mainly been
            working on the backend of the project, making sure the Logic works.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
        </Grid>
        </Grid>
    )
}
