import axios from 'axios'

// Create an axios instance with custom configuration
const api = axios.create({
    baseURL: 'http://localhost:3000',
})

export default api