import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import * as React from 'react'

export function Information() {
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
          />
        </Grid>
      </Grid>
    </React.Fragment>
  )
}
