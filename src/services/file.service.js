import { environment } from '../environments/environment'
import { authHeader } from './auth-header'
import axios from 'axios'

export default class FileService {
    async getFiles() {
        return await axios.get(`${environment.apiUrl}/file`, {
            headers: authHeader(),
        })
    }
    async getFile(id) {
        return await axios.get(`${environment.apiUrl}/file/${id}`, {
            headers: authHeader(),
        })
    }
    async removeFile(id) {
        return await axios.delete(`${environment.apiUrl}/file/${id}`, {
            headers: authHeader(),
        })
    }
    async downloadFile(id) {
        return await axios.get(`${environment.apiUrl}/file/download/${id}`, {
            responseType: 'blob',
        })
    }
}