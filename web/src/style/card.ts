import CSS from 'csstype'

export const viewportStyle: CSS.Properties = {
  width: '300px',
  margin: 'auto',
  height: '500px',
  background: '#fff',
  marginTop: '100px',
}

export const cardStyle: CSS.Properties = {
  width: '300px',
  height: '400px',
  background: '#555',
  listStyle: 'none',
  borderRadius: '5px',
  position: 'absolute',
  boxShadow: '0 0 2px rgba(0,0,0,.2)',
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

export const buttonsStyle: CSS.Properties = {
  position: 'absolute',
  marginTop: '420px',
  marginLeft: '70px',
}
