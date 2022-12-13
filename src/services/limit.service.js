import { environment } from '../environments/environment'
import { authHeader } from './auth-header'
import axios from 'axios'

export default class LimitService {
    async getByUserId(id) {
        return await axios.get(`${environment.apiUrl}/limit/getLimits/${id ?? ''}`, {
            headers: authHeader(),
        })
    }
    async createOrUpdate(limit) {
        return await axios.post(`${environment.apiUrl}/limit`, limit, {
            headers: authHeader(),
        })
    }
}