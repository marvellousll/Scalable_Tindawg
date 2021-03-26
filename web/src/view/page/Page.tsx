import * as React from 'react'
import { PageStyle } from '../../style/page'
import { NavBar } from '../nav/NavBar'

export function Page(props: React.PropsWithChildren<JSX.IntrinsicElements['div']>) {
  return (
    <div className="mw8" style={PageStyle}>
      <NavBar />
      {props.children}
    </div>
  )
}
