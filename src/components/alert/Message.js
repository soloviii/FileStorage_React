import React from 'react'
import Alert from 'react-bootstrap/Alert'

function Message({ text }) {
  return <Alert variant="success">{text}</Alert>
}

export default Message
