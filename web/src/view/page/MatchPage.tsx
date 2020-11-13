import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { makeStyles } from '@material-ui/core/styles';
import { RouteComponentProps } from '@reach/router';
import * as React from 'react';
import { AppRouteParams } from '../nav/route';
import { Page } from './Page';

interface ExplorePageProps extends RouteComponentProps, AppRouteParams {}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
  },
}));

const tileData = [
    {
      img: 'https://www.rockymtnresorts.com/wp-content/uploads/2018/12/dog-friendly01.jpg',
      title: 'Image',
      author: 'author',
      cols: 3,
    },
    {
      img: 'https://www.rockymtnresorts.com/wp-content/uploads/2018/12/dog-friendly01.jpg',
      title: 'Image',
      author: 'author',
      cols: 3,
    },
    {
      img: 'https://www.rockymtnresorts.com/wp-content/uploads/2018/12/dog-friendly01.jpg',
      title: 'Image',
      author: 'author',
      cols: 3,
    },
    {
      img: 'https://www.rockymtnresorts.com/wp-content/uploads/2018/12/dog-friendly01.jpg',
      title: 'Image',
      author: 'author',
      cols: 3,
    },
    {
      img: 'https://www.rockymtnresorts.com/wp-content/uploads/2018/12/dog-friendly01.jpg',
      title: 'Image',
      author: 'author',
      cols: 3,
    },
    {
      img: 'https://www.rockymtnresorts.com/wp-content/uploads/2018/12/dog-friendly01.jpg',
      title: 'Image',
      author: 'author',
      cols: 3,
    },
    {
      img: 'https://www.rockymtnresorts.com/wp-content/uploads/2018/12/dog-friendly01.jpg',
      title: 'Image',
      author: 'author',
      cols: 3,
    },
  ];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function MatchPage(props: ExplorePageProps) {
  const classes = useStyles();
  return (
    <Page>
    <div className={classes.root}>
      <GridList cellHeight={200} className={classes.gridList} cols={3}>
        {tileData.map((tile) => (
          <GridListTile key={tile.img} cols={tile.cols || 1}>
            <img src={tile.img} alt={tile.title} />
          </GridListTile>
        ))}
      </GridList>
    </div>
    </Page>
  );
}