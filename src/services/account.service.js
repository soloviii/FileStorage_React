import { useEffect } from 'react'
import { environment } from '../environments/environment'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const AccountService = () => {
    const navigate = useNavigate()

    useEffect(() => {
        fetchData()
    }, [])

    async function fetchData() {
        localStorage.removeItem('currentUser')
        await axios.post(`${environment.apiUrl}/account/logout`, {})
        navigate('/login')
        window.location.reload(false)
    }

    return null
}