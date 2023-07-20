import axios from 'axios'

const URL = import.meta.env.VITE_API_HOST || 'http://localhost:3000'

// Create an axios instance with custom configuration
const api = axios.create({
    baseURL: URL,
})

export default api