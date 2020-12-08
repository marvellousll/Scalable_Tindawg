import { useQuery } from '@apollo/client'
import Button from '@material-ui/core/Button'
import { red } from '@material-ui/core/colors'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import * as filestack from 'filestack-js'
import * as React from 'react'
import { Fragment, useContext, useEffect, useState } from 'react'
import { getImageById, getImageByIdVariables } from '../../graphql/query.gen'
import { UserContext } from '../auth/user'
import { fetchImage } from './fetchInfo'
import { mutateInfo } from './mutateInfo'
const imageUploadClient = filestack.init('A0fk1D5viSB2l6aXkzkrez')

const ColorButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(red[400]),
    backgroundColor: red[400],
    '&:hover': {
      backgroundColor: red[700],
    },
  },
}))(Button)

const useStyles = makeStyles(theme => ({
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  image: {
    margin: 'auto',
    height: '350px',
    width: '250px',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}))

export function Image() {
  const user = useContext(UserContext)
  const id = user.user?.id == null ? 0 : user.user?.id
  const classes = useStyles()

  const [_image, setImage] = useState('')
  const data = useQuery<getImageById, getImageByIdVariables>(fetchImage, { variables: { userId: id } })['data']

  useEffect(() => {
    if (data && data.getUserInfoById) {
      const image = data.getUserInfoById!.imageURL!
      setImage(image)
    }
  }, [data])

  const imageUploadOptions = {
    onUploadDone: async (res: any) => {
      console.log(res.filesUploaded[0].url)
      setImage(res.filesUploaded[0].url)
      await mutateInfo({
        imageURL: res.filesUploaded[0].url,
      })
    },
  }
  return (
    <Fragment>
      <div className={classes.imageContainer}>
        <img src={_image} className={classes.image} />
      </div>
      <div className={classes.imageContainer}>
        <ColorButton
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={() => imageUploadClient.picker(imageUploadOptions).open()}
        >
          {'Upload Image'}
        </ColorButton>
      </div>
    </Fragment>
  )
}
