import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import GoogleLogin from 'react-google-login'
import { AppRouteParams } from '../nav/route'

const responseGoogle = (response: any) => {
  console.log(response)
}
const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}))
//'https://www.rockymtnresorts.com/wp-content/uploads/2018/12/dog-friendly01.jpg'
interface LoginSignupProps extends RouteComponentProps, AppRouteParams {}
export const LoginSignup = (props: LoginSignupProps) => {
  const myStyle = {
    backgroundImage: 'url(https://www.rockymtnresorts.com/wp-content/uploads/2018/12/dog-friendly01.jpg)',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
    weight: '100vh',
  }
  const classes = useStyles()
  return (
    <Container fixed>
      <div style={myStyle}>
        <div style={{ color: 'black', fontSize: '60' }}>TINDAWG</div>
        <div className={classes.root}>
          <GoogleLogin
            clientId="24410381832-jg15gpvg63pt3bj7hjmeevft9i2usit9.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
          />
        </div>
      </div>
    </Container>
  )
}
