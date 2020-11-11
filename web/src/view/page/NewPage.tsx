import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import Cards from '../card/Card'
import { AppRouteParams } from '../nav/route'
import { Page } from './Page'

interface ExplorePageProps extends RouteComponentProps, AppRouteParams {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function NewPage(props: ExplorePageProps) {
  return (
    <Page>
      <Cards />
    </Page>
  )
}
