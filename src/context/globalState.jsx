import { atom, useRecoilState } from 'recoil';
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getMarkers, getMarker, postMarker, updateMarker, deleteMarker } from '../api/markers'

const themeState = atom({
    key: 'theme',
    default: localStorage.getItem("themeLocal") || 'dark',
})

const tempMarkerState = atom({
    key: 'tempMarker',
    default: false,
})

const markerFilterState = atom({
    key: 'markerFilter',
    default: '',
})

const latLngState = atom({
    key: 'latLng',
    default: {},
})

// Hook for using Recoil global state
export const useGlobalState = () => {

    const [theme, setTheme] = useRecoilState(themeState)
    const [latLng, setLatLng] = useRecoilState(latLngState)
    const [markerFilter, setMarkerFilter] = useRecoilState(markerFilterState)
    const [tempMarker, setTempMarker] = useRecoilState(tempMarkerState)

    return { theme, setTheme, latLng, setLatLng, markerFilter, setMarkerFilter, tempMarker, setTempMarker }
}

// Hook for using React Query
export function useReactQueries() {
    // Access the query client provider
    const queryClient = useQueryClient()

    // Get all markers from the backend
    const markerQuery = useQuery('queryMarkers', getMarkers)

    // Mutation for creating a marker
    const createMarker = useMutation({
        mutationFn: postMarker,
        onSuccess: () => {
            console.log('create marker')

            queryClient.invalidateQueries({ queryKey: ['queryMarkers'] })
        },
        onError: (error) => {
            console.log(error)

            if (error.response.data?.errors || error.response.data?.error) {

                // Extract errors
                if (error.response.data.error) {
                    setError("backendErrors", { type: "manual", message: Array(error.response.data.error) })
                } else if (error.response.data.errors) {
                    setError("backendErrors", { type: "manual", message: error.response.data.errors })

                }
            }
            queryClient.invalidateQueries({ queryKey: ['todos'] })
        },
    })

    return { markerQuery, createMarker }
}


