import { useQuery } from '@apollo/client'
import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { getPotentialMatches } from '../../graphql/getPotentialMatches'
import { GetPotential } from '../../graphql/query.gen'
import Cards from '../card/Card'
import { NavBar } from '../nav/NavBar'
import { AppRouteParams } from '../nav/route'

interface ExplorePageProps extends RouteComponentProps, AppRouteParams {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function ExplorePage(props: ExplorePageProps) {
  const { loading, data } = useQuery<GetPotential>(getPotentialMatches)
  if (loading || !data || !data.getPotentialMatches) {
    return null
  }

  return (
    <div className="mw8">
      <NavBar />
      <div style={{ margin: '10px' }}>
        <Cards getPotentialMatches={data.getPotentialMatches} />
      </div>
    </div>
  )
}
