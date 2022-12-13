import React, { useState } from 'react'
import Alert from 'react-bootstrap/Alert'

function ErrorComponent({ text }) {
  return <Alert variant="danger">{text}</Alert>
}

export default ErrorComponent
