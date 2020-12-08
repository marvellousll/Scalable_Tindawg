import { useQuery } from '@apollo/client'
import { GridListTileBar } from '@material-ui/core'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import { makeStyles } from '@material-ui/core/styles'
// import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { getMatches } from '../../graphql/getMatches'
import { GetMatches } from '../../graphql/query.gen'
import { NavBar } from '../nav/NavBar'
// import { AppRouteParams } from '../nav/route'
// import { ProfileView } from '../profileView/ProfileView'

// interface MatchPageProps extends RouteComponentProps, AppRouteParams {}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    borderSpacing: 10,
  },
  gridList: {
    width: 600,
    height: 'auto',
    maxHeight: '700',
    margin: '10px',
  },
}))

// eslint-disable-next-line @typescript-eslint/no-unused-vars

export function MatchPage() {
  const { loading, data } = useQuery<GetMatches>(getMatches)
  if (loading || data == null || data.getMatches == null) {
    return null
  }

  const matches = data.getMatches!
  // const [open, setOpen] = React.useState(false)

  // const handleClickOpen = () => {
  //   setOpen(true)
  // }

  // const handleClose = () => {
  //   setOpen(false)
  // }

  const classes = useStyles()
  return (
    <div className="mw8">
      <NavBar />
      <div className={classes.root} style={{ marginTop: '50px' }}>
        <div style={{ margin: '10px' }}>
          <GridList cellHeight={180} className={classes.gridList}>
            {matches.map(match => (
              <div key={match!.user!.id}>
                {/* <GridListTile onClick={handleClickOpen}> */}
                <GridListTile>
                  <img src={match!.imageURL!} />
                  <GridListTileBar title={match!.dogName} subtitle={<span>Breed: {match!.dogBreed} </span>} />
                </GridListTile>
                {/* <ProfileView open={open} onClose={handleClose} userInfo={match!} /> */}
              </div>
            ))}
          </GridList>
        </div>
      </div>
    </div>
  )
}
