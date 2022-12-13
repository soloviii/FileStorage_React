import React, { useEffect, useState } from 'react'
import UserService from '../../services/user.service'
import { UserBlock } from './UserBlock'
import Card from 'react-bootstrap/Card'
import '../css/Users.css'

export const UsersComponent = () => {
  const [users, setUsers] = useState([])

  let userService = new UserService()

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    try {
      userService.getUsers().then((result) => {
        setUsers(result.data)
      })
    } catch (err) {}
  }

  return (
    <div className="container">
      <Card>
        <Card.Header className="text-center" as="h2">
          Users
        </Card.Header>

        <Card.Body>
          <div class="first-line">
            <p>
              This page can be accessed <u>only by administrators</u>.
            </p>
            <a href="/limit" class="btn btn-warning">
              Edit limits for all users
            </a>
          </div>
          {users.length !== 0
            ? users.map((user) => <UserBlock key={user.id} user={user} />)
            : null}{' '}
        </Card.Body>
      </Card>
    </div>
  )
}
