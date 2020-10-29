import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { ColorName, Colors } from '../../../../common/src/colors'
import { H1, H3 } from '../../style/header'
import { style } from '../../style/styled'
import Cards from '../card/Card'
import { AppRouteParams } from '../nav/route'
import { Page } from './Page'

interface MatchPageProps extends RouteComponentProps, AppRouteParams {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function MatchPage(props: MatchPageProps) {
  return (
    <Page>
      <Hero>
        <H1>MATCHES</H1>
        <H3>Your Favorite Dawgs</H3>
      </Hero>
      <Content>
        <LContent>
          <Section>
            <Cards/>
          </Section>
          <Section>
            <Cards/>
          </Section>
        </LContent>
        <RContent>
          <Section>
           <Cards/>
          </Section>
          <Section>
            <Cards/>
          </Section>
        </RContent>
      </Content>
    </Page>
  )
}

const Hero = style('div', 'mb4 w-120 ba b--mid-gray br2 pa3 tc', {
  borderLeftColor: Colors.lemon + '!important',
  borderRightColor: Colors.lemon + '!important',
  borderLeftWidth: '4px',
  borderRightWidth: '4px',
})

const Content = style('div', 'flex-l')

const LContent = style('div', 'flex-grow-0 w-60-l mr4-l')

const RContent = style('div', 'flex-grow-0 w-60-l mr4-l')

const Section = style('div', 'mb4 mid-gray ba b--mid-gray br2 pa3', (p: { $color?: ColorName }) => ({
  borderLeftColor: Colors[p.$color || 'lemon'] + '!important',
  borderLeftWidth: '3px',
}))

