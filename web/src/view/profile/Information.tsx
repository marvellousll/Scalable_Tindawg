import { useQuery } from '@apollo/client'
import Button from '@material-ui/core/Button'
import { red } from '@material-ui/core/colors'
import Grid from '@material-ui/core/Grid'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import * as React from 'react'
import { useEffect } from 'react'
import { getUserInfoById, getUserInfoByIdVariables } from '../../graphql/query.gen'
import { UserContext } from '../auth/user'
import { fetchInfo } from './fetchInfo'
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
}))

export function Information() {
  const user = React.useContext(UserContext)
  const id = user.user?.id == null ? 0 : user.user?.id
  const { loading, data } = useQuery<getUserInfoById, getUserInfoByIdVariables>(fetchInfo, {
    variables: { userId: id },
  })

  const classes = useStyles()

  const [dogname, setDogname] = React.useState('')
  const [dogbreed, setDogbreed] = React.useState('')
  const [dogage, setDogage] = React.useState(Number)
  const [dogbio, setDogbio] = React.useState('')

  useEffect(() => {
    if (data && data.getUserInfoById) {
      const name = data.getUserInfoById!.dogName!
      const breed = data.getUserInfoById!.dogBreed!
      const age = data.getUserInfoById!.dogAge!
      const bio = data.getUserInfoById!.bio!

      setDogname(name)
      setDogbreed(breed)
      setDogage(age)
      setDogbio(bio)
    }
  }, [data])

  async function handleChange() {
    await mutateInfo({
      dogName: dogname,
      dogAge: dogage,
      dogBreed: dogbreed,
      bio: dogbio,
    })
  }

  if (loading || data == null) {
    return null
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Dog Information
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            label="Dog Name"
            placeholder="Enter Dog Name Here"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            onChange={e => setDogname(e.target.value)}
            value={dogname}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            label="Age"
            placeholder="Enter Age Here"
            margin="none"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            onChange={e => setDogage(parseInt(e.target.value))}
            value={dogage}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            label="Breed"
            placeholder="Enter Breed Here"
            margin="none"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            onChange={e => setDogbreed(e.target.value)}
            value={dogbreed}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Description"
            placeholder="What is special about your dog?"
            multiline
            fullWidth
            rows={4}
            variant="outlined"
            onChange={e => setDogbio(e.target.value)}
            value={dogbio}
          />
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
