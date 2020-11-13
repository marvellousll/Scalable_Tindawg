import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { AppRouteParams } from '../nav/route'
import { Signup } from '../profile/Signup'
import { Page } from './Page'

interface EditProfilePageProps extends RouteComponentProps, AppRouteParams {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function EditProfilePage(props: EditProfilePageProps) {
  return (
    <Page>
      <Signup />
    </Page>
  )
}
