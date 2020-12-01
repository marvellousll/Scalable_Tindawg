import { useQuery } from '@apollo/client'
import Button from '@material-ui/core/Button'
import { red } from '@material-ui/core/colors'
import Grid from '@material-ui/core/Grid'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import * as React from 'react'
// import S3 from 'react-aws-s3'
import Resizer from 'react-image-file-resizer'
import { getContactById, getContactByIdVariables } from '../../graphql/query.gen'
import { UserContext } from '../auth/user'
import { fetchContact } from './fetchInfo'
import { mutateInfo } from './mutateInfo'

// const config = {
//   bucketName: 'tf-bucket',
//   region: process.env.AWS_REGION,
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
// }

// const ReactS3Client = new S3(config)

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
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  file: {
    border: '1px solid #ccc',
    display: 'inline-block',
    padding: '6px 12px',
    cursor: 'pointer',
    color: '#fff',
    background: red[400],
  },
}))

export function Contact() {
  const user = React.useContext(UserContext)
  const id = user.user?.id == null ? 0 : user.user?.id
  const data = useQuery<getContactById, getContactByIdVariables>(fetchContact, { variables: { userId: id } })['data']
  const classes = useStyles()

  const contact = data?.getUserInfoById?.contact
  const facebook = data?.getUserInfoById?.facebook
  const linkedin = data?.getUserInfoById?.linkedin
  const location = data?.getUserInfoById?.location

  const [_contact, setContact] = React.useState(contact == null ? undefined : contact)
  const [_facebook, setFacebook] = React.useState(facebook == null ? undefined : facebook)
  const [_linkedin, setLinkedin] = React.useState(linkedin == null ? undefined : linkedin)
  const [_location, setLocation] = React.useState(location == null ? undefined : location)

  // async function uploadImage(uri: string) {
  //   const newFileName = 'dogImage-' + id
  //   let fileLocation = ''
  //   ReactS3Client.uploadFile(uri, newFileName).then((data: any) => {
  //     fileLocation = data.location
  //     console.log(data)
  //   })

  //   await mutateInfo({
  //     imageURL: fileLocation,
  //   })
  // }

  async function fileChangedHandler(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files != null) {
      Resizer.imageFileResizer(
        event.target.files[0],
        400,
        500,
        'JPEG',
        100,
        0,
        async uri => {
          // await uploadImage(String(uri))
        },
        'base64',
        400,
        500
      )
    }
  }

  async function handleChange() {
    await mutateInfo({
      contact: _contact,
      facebook: _facebook,
      linkedin: _linkedin,
      location: _location,
    })
  }
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Contact
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            label="Contact"
            placeholder="Enter Cell Phone Here"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            onChange={e => setContact(e.target.value)}
            value={_contact}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Facebook"
            placeholder="Link To Facebook"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            onChange={e => setFacebook(e.target.value)}
            value={_facebook}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="LinkedIn"
            placeholder="LinkedIn Profile"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            onChange={e => setLinkedin(e.target.value)}
            value={_linkedin}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Location"
            placeholder="Your Current Location"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            onChange={e => setLocation(e.target.value)}
            value={_location}
          />
        </Grid>
        <Grid item xs={12}>
          <label className={classes.file}>
            <input type="file" style={{ display: 'none' }} onChange={fileChangedHandler} />
            Upload Image here
          </label>
        </Grid>
      </Grid>
      <div className={classes.buttons}>
        <ColorButton variant="contained" color="primary" onClick={handleChange} className={classes.button}>
          {'Save'}
        </ColorButton>
      </div>
    </React.Fragment>
  )
}
