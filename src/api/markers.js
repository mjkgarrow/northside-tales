import api from './axiosConfig'

// Get all markers (async method)
export async function getMarkers() {
    const response = await api.get('/markers')
    return response.data
}

// Get single marker by id
export async function getMarker(markerId) {
    const response = await api.get(`/markers/${markerId}`)
    return response.data
}

// Create marker. A marker is { title, description, dueDate }
export async function postMarker(marker) {
    const response = await api.post('/markers', marker)
    return response.data
}

// Update marker
export async function updateMarker(data) {
    const response = await api.put(`/markers/${data.markerId}`, data.updatedData)
    return response.data
}

// Delete marker
export async function deleteMarker(markerId) {
    const response = await api.delete(`/markers/${markerId}`)
    return response.data
}

