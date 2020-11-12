import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { AppRouteParams } from '../nav/route'
import { Signup } from '../profile/Signup'
import { Page } from './Page'

interface ProfilePageProps extends RouteComponentProps, AppRouteParams {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function ProfilePage(props: ProfilePageProps) {
  return (
    <Page>
      <Signup />
    </Page>
  )
}
