import React, { useState, useEffect } from 'react'
import '../css/UserBlock.css'
import { useNavigate } from 'react-router-dom'

export const UserBlock = ({ user, ...rest }) => {
  const navigate = useNavigate()

  const navigateToUser = async (e) => {
    e.preventDefault()
    navigate(`/user/:${user.id}`)
  }

  return (
    <div className="container mt-2">
      <div className="block" onClick={navigateToUser}>
        <div>
          <span className="">{user.email}</span>
          <span className="name"> {user.firstName}</span>
          <span className="name"> {user.lastName}</span>
        </div>
        <div>
          <span className="role">{user.role}</span>
        </div>
      </div>
    </div>
  )
}
