import { useQuery } from '@apollo/client'
import Button from '@material-ui/core/Button'
import { red } from '@material-ui/core/colors'
import Grid from '@material-ui/core/Grid'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import * as React from 'react'
import { useEffect } from 'react'
import { getContactById, getContactByIdVariables } from '../../graphql/query.gen'
import { UserContext } from '../auth/user'
import { fetchContact } from './fetchInfo'
import { mutateInfo } from './mutateInfo'

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
  const classes = useStyles()

  const [_contact, setContact] = React.useState('')
  const [_facebook, setFacebook] = React.useState('')
  const [_linkedin, setLinkedin] = React.useState('')
  const [_location, setLocation] = React.useState('')
  const data = useQuery<getContactById, getContactByIdVariables>(fetchContact, { variables: { userId: id } })['data']

  useEffect(() => {
    if (data && data.getUserInfoById) {
      const contact = data!.getUserInfoById!.contact!
      const facebook = data!.getUserInfoById!.facebook!
      const linkedin = data!.getUserInfoById!.linkedin!
      const location = data!.getUserInfoById!.location!

      setContact(contact)
      setFacebook(facebook)
      setLinkedin(linkedin)
      setLocation(location)
    }
  }, [data])

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
        {/* <Grid item xs={12}>
          <label className={classes.file}>
            <input
              type="file"
              style={{ display: 'none' }}
              onChange={() => imageUploadClient.picker(imageUploadOptions).open()}
            />
            Upload Image here
          </label>
        </Grid> */}
      </Grid>
      <div className={classes.buttons}>
        <ColorButton variant="contained" color="primary" onClick={handleChange} className={classes.button}>
          {'Save'}
        </ColorButton>
      </div>
    </React.Fragment>
  )
}
