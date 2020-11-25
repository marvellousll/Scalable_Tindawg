import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { useContext } from 'react'
import { LoginStyle } from '../../style/login'
import { PageStyle } from '../../style/page'
import { Login } from '../auth/Login'
import { UserContext } from '../auth/user'
import { NavBar } from '../nav/NavBar'
import { AppRouteParams } from '../nav/route'

interface LoginPageProps extends RouteComponentProps, AppRouteParams {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function LoginPage(props: LoginPageProps) {
  const { user } = useContext(UserContext)

  if (user)
    return (
      <div className="mw8" style={PageStyle}>
        <NavBar />
        <div style={LoginStyle}>
          <Login />
        </div>
      </div>
    )
  return (
    <div style={LoginStyle}>
      <Login />
    </div>
  )
}
