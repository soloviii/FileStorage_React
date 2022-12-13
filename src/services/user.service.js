import { environment } from '../environments/environment'
import { authHeader } from './auth-header'
import axios from 'axios'

export default class UserService {
    async getUsers() {
        return await axios.get(`${environment.apiUrl}/user/getUsers`, {
            headers: authHeader(),
        })
    }
    async getUser(id) {
        return await axios.get(`${environment.apiUrl}/user/${id ?? ''}`, {
            headers: authHeader(),
        })
    }
    async enable(id) {
        const formData = new FormData()
        formData.append('id', id)
        return await axios.post(`${environment.apiUrl}/user/enable/${id}`, formData, {
            headers: authHeader(),
        })
    }
    async disable(id) {
        const formData = new FormData()
        formData.append('id', id)
        return await axios.post(`${environment.apiUrl}/user/disable/${id}`, formData, {
            headers: authHeader(),
        })
    }
    async addAdmin(id) {
        const formData = new FormData()
        formData.append('id', id)
        return await axios.post(`${environment.apiUrl}/user/addAdmin/${id}`, formData, {
            headers: authHeader(),
        })
    }
    async removeAdmin(id) {
        const formData = new FormData()
        formData.append('id', id)
        return await axios.post(`${environment.apiUrl}/user/removeAdmin/${id}`, formData, {
            headers: authHeader(),
        })
    }
}