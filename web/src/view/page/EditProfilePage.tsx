import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { NavBar } from '../nav/NavBar'
import { AppRouteParams } from '../nav/route'
import { Signup } from '../profile/Signup'

interface EditProfilePageProps extends RouteComponentProps, AppRouteParams {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function EditProfilePage(props: EditProfilePageProps) {
  return (
    <div className="mw8">
      <NavBar />
      <Signup />
    </div>
  )
}
