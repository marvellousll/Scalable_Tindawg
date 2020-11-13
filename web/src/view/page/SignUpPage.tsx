import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { Signup } from '../auth/Signup'
import { AppRouteParams } from '../nav/route'
import { Page } from './Page'

interface SignUpPageProps extends RouteComponentProps, AppRouteParams {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function SignupPage(props: SignUpPageProps) {
  return (
    <Page>
      <Signup />
    </Page>
  )
}
