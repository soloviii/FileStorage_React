import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import ErrorComponent from '../alert/ErrorComponent'
import axios from 'axios'
import { environment } from '../../environments/environment'
import Message from '../alert/Message'

const RegisterComponent = () => {
  const [firstName, setFirstName] = useState()
  const [firstNameDirty, setFirstNameDirty] = useState(false)
  const [firstNameError, setFirstNameError] = useState('First Name is required')

  const [lastName, setLastName] = useState()
  const [lastNameDirty, setLastNameDirty] = useState(false)
  const [lastNameError, setLastNameError] = useState('Last Name is required')

  const [email, setEmail] = useState()
  const [emailDirty, setEmailDirty] = useState(false)
  const [emailError, setEmailError] = useState('Email is required')

  const [password, setPassword] = useState()
  const [passwordDirty, setPasswordDirty] = useState(false)
  const [passwordError, setPasswordError] = useState('Password is required')

  const [confirmPassword, setConfirmPassword] = useState()
  const [confirmPasswordDirty, setConfirmPasswordDirty] = useState(false)
  const [confirmPasswordError, setConfirmPasswordError] = useState(
    'Confirm password is required',
  )
  const [response, setResponse] = useState([])
  const [result, setResult] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    let user = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    }

    try {
      await axios.post(`${environment.apiUrl}/account/register`, user)
      setResult('You have successfully registered!')
      setTimeout(() => setResult(''), 3000)
    } catch (err) {
      if (err.response.status === 500) {
        setResponse(['There was a problem with the server'])
      } else {
        setResponse(err.response.data)
      }
    }

    setFirstName('')
    setLastName('')
    setEmail('')
    setPassword('')
    setConfirmPassword('')
  }

  const firstNameHandler = (e) => {
    let firstName = e.target.value
    setFirstName(firstName)
    if (firstName === '') setFirstNameError('First Name is required')
    else setFirstNameError('')
  }
  const lastNameHandler = (e) => {
    let lastName = e.target.value
    setLastName(lastName)
    if (lastName === '') setLastNameError('Last Name is required')
    else setLastNameError('')
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
    if (pass.length < 6 || pass != confirmPassword)
      setPasswordError(
        'Password and confirm password must be the same with at least 6 characters',
      )
    else {
      setPasswordError('')
      setConfirmPasswordError('')
    }
  }
  const confirmPasswordHandler = (e) => {
    let conpassword = e.target.value
    setConfirmPassword(conpassword)
    if (conpassword.length < 6 || conpassword != password)
      setConfirmPasswordError(
        'Password and confirm password must be the same with at least 6 characters',
      )
    else {
      setPasswordError('')
      setConfirmPasswordError('')
    }
  }

  const handleCancel = (e) => {
    window.location.reload(false)
  }

  const blurHandler = (e) => {
    switch (e.target.name) {
      case 'firstName':
        setFirstNameDirty(true)
        setResponse('')
        break
      case 'lastName':
        setLastNameDirty(true)
        setResponse('')
        break
      case 'email':
        setEmailDirty(true)
        setResponse('')
        break
      case 'password':
        setPasswordDirty(true)
        setResponse('')
        break
      case 'confirmPassword':
        setConfirmPasswordDirty(true)
        setResponse('')
        break
    }
  }

  return (
    <div className="container mt-4">
      {result ? <Message text={result} /> : null}
      {response
        ? response.map((value, index) => (
            <ErrorComponent key={index} text={value.description} />
          ))
        : null}
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="firstName">
          {firstNameDirty && firstNameError && (
            <ErrorComponent text={firstNameError} />
          )}
          <Form.Control
            value={firstName}
            onBlur={(e) => blurHandler(e)}
            onChange={(e) => firstNameHandler(e)}
            name="firstName"
            type="text"
            placeholder="First Name"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="lastName">
          {lastNameDirty && lastNameError && (
            <ErrorComponent text={lastNameError} />
          )}
          <Form.Control
            value={lastName}
            onBlur={(e) => blurHandler(e)}
            onChange={(e) => lastNameHandler(e)}
            name="lastName"
            type="text"
            placeholder="Last Name"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          {emailDirty && emailError && <ErrorComponent text={emailError} />}
          <Form.Control
            value={email}
            onBlur={(e) => blurHandler(e)}
            onChange={(e) => emailHandler(e)}
            name="email"
            type="text"
            placeholder="Email"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          {passwordDirty && passwordError && (
            <ErrorComponent text={passwordError} />
          )}
          <Form.Control
            value={password}
            onBlur={(e) => blurHandler(e)}
            onChange={(e) => passwordHandler(e)}
            name="password"
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="confirmPassword">
          {confirmPasswordDirty && confirmPasswordError && (
            <ErrorComponent text={confirmPasswordError} />
          )}
          <Form.Control
            value={confirmPassword}
            onBlur={(e) => blurHandler(e)}
            onChange={(e) => confirmPasswordHandler(e)}
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
          />
        </Form.Group>
        <Button className="mr-2" variant="primary" type="submit">
          Submit
        </Button>
        <Button onClick={handleCancel} variant="light">
          Cancel
        </Button>{' '}
      </Form>
    </div>
  )
}

export default RegisterComponent
