import http from 'k6/http'
import { sleep, check } from 'k6'
import { Counter, Rate } from 'k6/metrics'

export const options = {
  scenarios: {
    example_scenario: {
      // name of the executor to use
      executor: 'constant-vus',

      vus: 50,
      duration: '30s',
    },
  },
}

export default function () {
  var randomNum = '' + Math.random(1) * 100
  var payload = JSON.stringify({
    email: 'xxx@gmail.com' + randomNum,
    password: '123123',
  })
  var params = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  //sign up
  const resp0 = http.post('http://localhost:3000/auth/createUser', payload, params)
  check(resp0, { 'sign up': (r) => r.status == 200 });
  sleep(Math.random() * 3)

  const resp1 = http.post(
    'http://localhost:3000/graphql',
    '{"operationName":"FetchUserContext","variables":{},"query":"query FetchUserContext{self{id}}"}',
    {
      headers: {
      'Content-Type': 'application/json',
     },
    }
  );
  check(resp1, { 'user ID': (r) => r.status == 200 });
  const id = resp1.json('data').self.id
  //check(resp1, { 'user ID': (r) => r.status == 200 });

  //getUserInfobyID
  let getUserInfoPayload = '{"operationName":"getUserInfoById","variables":{"userId":' + id + '},"query":"query getUserInfoById($userId: Int!) {\n  getUserInfoById(userId: $userId) {\n    dogName\n    dogAge\n    dogBreed\n    bio\n  }\n}\n"}'
  const resp2 = http.post(
    'http://localhost:3000/graphql',
    getUserInfoPayload,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
  check(resp2, { 'user INFO': (r) => r.status == 200 });

  //changeInfo1
  const resp3 = http.post(
    'http://localhost:3000/graphql',
    '{"operationName":"ChangeInfo","variables":{"input":{"dogName":"xxx","dogAge":1,"dogBreed":"x","bio":"xxx"}},"query":"mutation ChangeInfo($input: UserInput!) {\n  changeUserInfo(input: $input)\n}\n"}',
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
  check(resp3, { 'change INFO1': (r) => r.status == 200 });
  sleep(Math.random() * 3)

  //changeInfo2
  const resp4 = http.post(
    'http://localhost:3000/graphql',
    '{"operationName":"ChangeInfo","variables":{"input":{"contact":"123123","facebook":"","linkedin":"","location":"Los Angeles"}},"query":"mutation ChangeInfo($input: UserInput!) {\n  changeUserInfo(input: $input)\n}\n"}',
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
  check(resp4, { 'change INFO2': (r) => r.status == 200 });
  sleep(Math.random() * 3)

  //GetPotential
  const resp5 = http.post(
    'http://localhost:3000/graphql',
    '{"operationName":"GetPotential","variables":{},"query":"query GetPotential {\n  getPotentialMatches {\n    user {\n      id\n      __typename\n    }\n    dogName\n    dogAge\n    dogBreed\n    location\n    bio\n    contact\n    facebook\n    linkedin\n    imageURL\n    __typename\n  }\n}\n"}',
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
  check(resp5, { 'get Potential': (r) => r.status == 200 });

  //Swipe Right1
  const resp6 = http.post(
    'http://localhost:3000/graphql',
    '{"operationName":"SwipeRight","variables":{"userId":10},"query":"mutation SwipeRight($userId: Int!) {\n  swipeRight(userId: $userId)\n}\n"}',
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
  check(resp6, { 'swipe Right 1': (r) => r.status == 200 });
  sleep(Math.random() * 1)

  //Swipe Right2
  const resp7 = http.post(
    'http://localhost:3000/graphql',
    '{"operationName":"SwipeRight","variables":{"userId":9},"query":"mutation SwipeRight($userId: Int!) {\n  swipeRight(userId: $userId)\n}\n"}',
    {
       headers: {
        'Content-Type': 'application/json',
      },
    }
  )
  check(resp7, { 'swipe Right 2': (r) => r.status == 200 });
  sleep(Math.random() * 1)

  //Swipe Left1
  const resp8 = http.post(
    'http://localhost:3000/graphql',
    '{"operationName":"SwipeLeft","variables":{"userId":8},"query":"mutation SwipeLeft($userId: Int!) {\n  swipeLeft(userId: $userId)\n}\n"}',
    {
        headers: {
         'Content-Type': 'application/json',
      },
    }
  )
  check(resp8, { 'swipe Left 1': (r) => r.status == 200 });
  sleep(Math.random() * 1)

  //Swipe Left2
  const resp9 = http.post(
    'http://localhost:3000/graphql',
    '{"operationName":"SwipeLeft","variables":{"userId":7},"query":"mutation SwipeLeft($userId: Int!) {\n  swipeLeft(userId: $userId)\n}\n"}',
    {
        headers: {
         'Content-Type': 'application/json',
      },
    }
  )
  check(resp9, { 'swipe Left 2': (r) => r.status == 200 });
  sleep(Math.random() * 1)

  //Get Match
  const resp10 = http.post(
    'http://localhost:3000/graphql',
    '{"operationName":"GetMatches","variables":{},"query":"query GetMatches {\n  getMatches {\n    user {\n      id\n      __typename\n    }\n    dogName\n    dogAge\n    dogBreed\n    location\n    bio\n    contact\n    facebook\n    linkedin\n    imageURL\n    __typename\n  }\n}\n"}',
    {
        headers: {
         'Content-Type': 'application/json',
      },
    }
  )
  check(resp10, { 'GetMatch': (r) => r.status == 200 });
  sleep(Math.random() * 3)

  //logout
  const resp11 = http.post('http://localhost:3000/auth/logout', '', params)
  check(resp11, { 'LOG OUT': (r) => r.status == 200 });
}




const count200 = new Counter('status_code_2xx')
const count300 = new Counter('status_code_3xx')
const count400 = new Counter('status_code_4xx')
const count500 = new Counter('status_code_5xx')

const rate200 = new Rate('rate_status_code_2xx')
const rate300 = new Rate('rate_status_code_3xx')
const rate400 = new Rate('rate_status_code_4xx')
const rate500 = new Rate('rate_status_code_5xx')

function recordRates(res) {
  if (res.status >= 200 && res.status < 300) {
    count200.add(1)
    rate200.add(1)
  } else if (res.status >= 300 && res.status < 400) {
    console.log(res.body)
    count300.add(1)
    rate300.add(1)
  } else if (res.status >= 400 && res.status < 500) {
    count400.add(1)
    rate400.add(1)
  } else if (res.status >= 500 && res.status < 600) {
    count500.add(1)
    rate500.add(1)
  }
}