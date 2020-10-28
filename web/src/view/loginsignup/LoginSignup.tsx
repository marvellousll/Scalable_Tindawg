import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { AppRouteParams } from '../nav/route'
//import * as dog from './dog.jpg'
//const dog = require('./dog.jpg');
interface LoginSignupProps extends RouteComponentProps, AppRouteParams {}
export const LoginSignup = (props: LoginSignupProps) => {
  //return <img src={dog} />
  return (
    <div>
      <img src="https://www.rockymtnresorts.com/wp-content/uploads/2018/12/dog-friendly01.jpg" alt="new"></img>
    </div>
  )
}
