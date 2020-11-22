import CSS from 'csstype'

export const viewportStyle: CSS.Properties = {
  width: '300px',
  margin: 'auto',
  height: '500px',
  marginTop: '100px',
  background: 'none',
}

export const cardStyle: CSS.Properties = {
  width: '300px',
  height: '400px',
  background: '#555',
  listStyle: 'none',
  borderRadius: '10px',
  position: 'absolute',
  boxShadow: '0 0 4px rgba(0,0,0,.2)',
  textAlign: 'center',
  fontSize: '10px',
  boxSizing: 'border-box',
  cursor: 'default',
}

export const tagStyle: CSS.Properties = {
  color: '#fff',
  position: 'absolute',
  left: '10px',
  bottom: '10px',
  fontSize: '20px',
}

export const buttonListStyle: CSS.Properties = {
  position: 'absolute',
  marginTop: '420px',
  marginLeft: '70px',
}

export const buttonStyle: CSS.Properties = {
  backgroundColor: '#fff',
  boxShadow: '0 0 4px rgba(0,0,0,.3)',
}
