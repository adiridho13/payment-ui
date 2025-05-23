import axios from 'axios'

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL, // e.g. “http://localhost:3000”
    // withCredentials: true,                    // otomatis kirim & terima cookie “jwt”
})

export default api
