import { Navigate, Outlet } from 'react-router-dom'
import { isAuth, getRole } from '../../services/auth-header'
import { Roles } from '../models/roles'

export const PrivateRoutes = ({ roles }) => {
    // let auth = { token: false }
    // return auth.token ? < Outlet / > : < Navigate to = "/login" / >

    // return (isAuth() ? < Outlet / > : < Navigate to = "/login" / > )


    // return (isAuth() ? ({ roles.indexOf(getRole()) } ? < Outlet / > : null) : < Navigate to = "/login" / >)
    // return (isAuth() ? { isAuth() ? < Outlet / > : null } : < Navigate to = "/login" / > )

    function checkRole() {
        return roles.indexOf(getRole()) !== -1 ? < Outlet / > : < Navigate to = "/" / >
    }

    return (isAuth() ? checkRole() : < Navigate to = "/login" / > )
}