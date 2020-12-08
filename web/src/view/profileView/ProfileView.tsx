import { CardMedia } from '@material-ui/core'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Dialog from '@material-ui/core/Dialog'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import * as React from 'react'
import { GetMatches_getMatches, GetPotential_getPotentialMatches } from '../../graphql/query.gen'

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
    paddingTop: '125%', // 16:9
    boxShadow: '0 2px 4px rgba(0,0,0,.2)',
  },
})
//interface ProfileViewProps extends RouteComponentProps, AppRouteParams {}
export function ProfileView(props: {
  onClose: any
  open: any
  userInfo: GetPotential_getPotentialMatches | GetMatches_getMatches
}) {
  const classes = useStyles()
  const { onClose, open, userInfo } = props
  const { dogName, dogAge, dogBreed, bio, contact, location, imageURL } = userInfo
  const handleClose = () => {
    onClose()
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <Card className={classes.root}>
        <CardMedia className={classes.media} image={imageURL!} />
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            {location}
          </Typography>
          <Typography variant="h5" component="h2">
            {dogName}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            Age: {dogAge}
            <br />
            Breed: {dogBreed} <br />
            Email: {contact}
          </Typography>
          <Typography variant="body2" component="p">
            {bio}
          </Typography>
        </CardContent>
      </Card>
    </Dialog>
  )
}
