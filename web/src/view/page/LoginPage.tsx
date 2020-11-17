import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { LoginStyle } from '../../style/login'
import { Login } from '../auth/Login'
import { AppRouteParams } from '../nav/route'

interface LoginPageProps extends RouteComponentProps, AppRouteParams {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function LoginPage(props: LoginPageProps) {
  return (
    <div style={LoginStyle}>
      <Login />
    </div>
  )
}
