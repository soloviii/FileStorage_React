import { Roles } from '../components/models/roles'

export function authHeader() {
    const user = JSON.parse(localStorage.getItem('currentUser'))

    if (user && user.token) {
        return { Authorization: 'Bearer ' + user.token }
    } else {
        return {}
    }
}

export function isAuth() {
    const user = JSON.parse(localStorage.getItem('currentUser'))
    if (user) {
        return { user }
    } else {
        return null
    }
}

export function isAdmin() {
    const user = JSON.parse(localStorage.getItem('currentUser'))
    return user ? user.role === Roles.Admin : {}
}

export function getRole() {
    const user = JSON.parse(localStorage.getItem('currentUser'))
    return user ? user.role : null
}

export function isSuperAdmin() {
    const user = JSON.parse(localStorage.getItem('currentUser'))
    return user ? user.role === Roles.SuperAdmin : null
}

export function isAdminOrSuper() {
    const user = JSON.parse(localStorage.getItem('currentUser'))
    return user ? user.role === Roles.Admin || user.role === Roles.SuperAdmin : {}
}

export function isCurrentUser(email) {
    const user = JSON.parse(localStorage.getItem('currentUser'))
    return user ? user.email == email : false
}