import { CardMedia } from '@material-ui/core'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Dialog from '@material-ui/core/Dialog'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import * as React from 'react'

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
})
//interface ProfileViewProps extends RouteComponentProps, AppRouteParams {}
export function ProfileView(props: { onClose: any; open: any }) {
  const classes = useStyles()
  const { onClose, open } = props
  const handleClose = () => {
    onClose()
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <Card className={classes.root}>
        <CardMedia className={classes.media} image="https://cdn.orvis.com/images/DBS_GoldRetriever_1280.jpg" />
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            Los Angeles, CA
          </Typography>
          <Typography variant="h5" component="h2">
            Chewie
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            Gender: Male <br />
            Age: 4<br />
            Breed: Golden Retriever <br />
            Owner Name：Nick <br />
            Owner Email: Nickhasacutepuppy@puppy.com
          </Typography>
          <Typography variant="body2" component="p">
            He loves eating chicken and playing with other dogs.
          </Typography>
        </CardContent>
      </Card>
    </Dialog>
  )
}
