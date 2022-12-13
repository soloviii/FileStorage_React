import React from 'react'

import { Navigate, Outlet } from 'react-router-dom'

const useAuth = () => {
  const user = JSON.parse(localStorage.getItem('currentUser'))

  if (user) {
    return {
      auth: true,
      role: user.role,
    }
  } else {
    return {
      auth: false,
      role: null,
    }
  }
}

export const ProtectedRoutes = (props) => {
  const { auth, role } = useAuth()

  let roles = props.roleRequired
  if (roles) {
    return auth ? (
      roles[0] === role ? (
        <Outlet />
      ) : (
        <Navigate to="/" />
      )
    ) : (
      <Navigate to="/login" />
    )
  } else {
    return auth ? <Outlet /> : <Navigate to="/login" />
  }
}
