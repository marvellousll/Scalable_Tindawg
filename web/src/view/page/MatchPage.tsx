import { GridListTileBar } from '@material-ui/core'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import { makeStyles } from '@material-ui/core/styles'
import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { NavBar } from '../nav/NavBar'
import { AppRouteParams } from '../nav/route'
import { ProfileView } from '../profileView/ProfileView'

interface ExplorePageProps extends RouteComponentProps, AppRouteParams {}

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

const tileData = [
  {
    img: 'https://www.rockymtnresorts.com/wp-content/uploads/2018/12/dog-friendly01.jpg',
    name: 'Pumpkin',
    age: '3',
  },
  {
    img: 'https://www.rockymtnresorts.com/wp-content/uploads/2018/12/dog-friendly01.jpg',
    name: 'Pumpkin',
    age: '3',
  },
  {
    img: 'https://www.rockymtnresorts.com/wp-content/uploads/2018/12/dog-friendly01.jpg',
    name: 'Pumpkin',
    age: '3',
  },
  {
    img: 'https://www.rockymtnresorts.com/wp-content/uploads/2018/12/dog-friendly01.jpg',
    name: 'Pumpkin',
    age: '3',
  },
  {
    img: 'https://www.rockymtnresorts.com/wp-content/uploads/2018/12/dog-friendly01.jpg',
    name: 'Pumpkin',
    age: '3',
  },
  {
    img: 'https://www.rockymtnresorts.com/wp-content/uploads/2018/12/dog-friendly01.jpg',
    name: 'Pumpkin',
    age: '3',
  },
  {
    img: 'https://www.rockymtnresorts.com/wp-content/uploads/2018/12/dog-friendly01.jpg',
    name: 'Pumpkin',
    age: '3',
  },
  {
    img: 'https://www.rockymtnresorts.com/wp-content/uploads/2018/12/dog-friendly01.jpg',
    name: 'Pumpkin',
    age: '3',
  },
  {
    img: 'https://www.rockymtnresorts.com/wp-content/uploads/2018/12/dog-friendly01.jpg',
    name: 'Pumpkin',
    age: '3',
  },
]

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function MatchPage(props: ExplorePageProps) {
  const [open, setOpen] = React.useState(false)
  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const classes = useStyles()
  return (
    <div className="mw8">
      <NavBar />
      <div className={classes.root} style={{ marginTop: '50px' }}>
        <div style={{ margin: '10px' }}>
          <GridList cellHeight={180} className={classes.gridList}>
            {tileData.map(tile => (
              <GridListTile key={tile.img}>
                <img src={tile.img} onClick={handleClickOpen} />
                <GridListTileBar title={tile.name} subtitle={<span>Age: {tile.age} </span>} />
              </GridListTile>
            ))}
          </GridList>
        </div>
        <ProfileView open={open} onClose={handleClose} />
      </div>
    </div>
  )
}
