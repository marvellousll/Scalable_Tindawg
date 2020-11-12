import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { loginStyle } from '../../style/login'
import { AppRouteParams } from '../nav/route'

interface LoginSignupProps extends RouteComponentProps, AppRouteParams {}

export const LoginSignup = (props: LoginSignupProps) => {
  return <div style={loginStyle}></div>
}
