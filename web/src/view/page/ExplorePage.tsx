import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import Cards from '../card/Card'
import { NavBar } from '../nav/NavBar'
import { AppRouteParams } from '../nav/route'

interface ExplorePageProps extends RouteComponentProps, AppRouteParams {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function ExplorePage(props: ExplorePageProps) {
  return (
    <div className="mw8">
      <NavBar />
      <div style={{ margin: '10px' }}>
        <Cards />
      </div>
    </div>
  )
}
