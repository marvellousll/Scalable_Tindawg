import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import * as React from 'react'

export function Contact() {
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
          />
        </Grid>
      </Grid>
    </React.Fragment>
  )
}
