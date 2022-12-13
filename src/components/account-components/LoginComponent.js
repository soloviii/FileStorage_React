import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import ErrorComponent from '../alert/ErrorComponent'
import axios from 'axios'
import { environment } from '../../environments/environment'
import { useNavigate } from 'react-router-dom'

const LoginComponent = () => {
  const [email, setEmail] = useState()
  const [emailDirty, setEmailDirty] = useState(false)
  const [emailError, setEmailError] = useState('Email is required')

  const [password, setPassword] = useState()
  const [passwordDirty, setPasswordDirty] = useState(false)
  const [passwordError, setPasswordError] = useState('Password is required')

  const [response, setResponse] = useState([])

  const navigate = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault()
    let user = {
      email: email,
      password: password,
    }

    try {
      let result = await axios.post(`${environment.apiUrl}/account/login`, user)
      localStorage.setItem('currentUser', JSON.stringify(result.data))
      navigate('/')
      window.location.reload(false)
    } catch (err) {
      if (err.response.status === 500) {
        setResponse(['There was a problem with the server'])
      } else {
        setResponse(err.response.data)
      }
    }
  }

  const emailHandler = (e) => {
    let email = e.target.value
    setEmail(email)
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

    if (!re.test(String(email).toLowerCase()))
      setEmailError('Email is not right')
    else setEmailError('')
  }
  const passwordHandler = (e) => {
    let pass = e.target.value
    setPassword(pass)
    if (pass.length == 0) setPasswordError('Password is not right')
    else {
      setPasswordError('')
    }
  }

  const blurHandler = (e) => {
    switch (e.target.name) {
      case 'email':
        setEmailDirty(true)
        break
      case 'password':
        setPasswordDirty(true)
        setResponse('')
        break
    }
  }

  return (
    <div className="container mt-4">
      {' '}
      {response
        ? response.map((value, index) => (
            <ErrorComponent key={index} text={value.description} />
          ))
        : null}{' '}
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="email">
          {' '}
          {emailDirty && emailError && (
            <ErrorComponent text={emailError} />
          )}{' '}
          <Form.Control
            value={email}
            onBlur={(e) => blurHandler(e)}
            onChange={(e) => emailHandler(e)}
            name="email"
            type="text"
            placeholder="Email"
          />
        </Form.Group>{' '}
        <Form.Group className="mb-3" controlId="password">
          {' '}
          {passwordDirty && passwordError && (
            <ErrorComponent text={passwordError} />
          )}{' '}
          <Form.Control
            value={password}
            onBlur={(e) => blurHandler(e)}
            onChange={(e) => passwordHandler(e)}
            name="password"
            type="password"
            placeholder="Password"
          />
        </Form.Group>{' '}
        <Button className="mr-2" variant="primary" type="submit">
          Submit{' '}
        </Button>{' '}
        <Button onClick={() => navigate('/register')} variant="light">
          Register{' '}
        </Button>{' '}
      </Form>{' '}
    </div>
  )
}

export default LoginComponent
