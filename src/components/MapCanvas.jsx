import 'leaflet/dist/leaflet.css'
import { MapContainer, Popup, Marker, useMapEvents } from 'react-leaflet'
import { useEffect } from 'react'
import { useGlobalState } from '../context/globalState'
import { DarkCleanMap, LightCleanMap, mapCanvasProps, customIcon, createCustomClusterIcon } from './MapAssets'

export default function MapCanvas() {
    const { theme, markers, setLatLng, markerFilter } = useGlobalState()

    // Refresh map on theme change
    useEffect(() => {

    }, [theme])

    // Handle map events
    function MapEventHandler() {
        useMapEvents({
            // On click, open modal
            click: (event) => {
                // console.log(event.latlng)

                // Set latLng data to global context
                setLatLng(event.latlng)

                // Open form modal
                window.meeting_modal_create.showModal()
            },
        })
    }

    const filteredMarkers = () => {
        return markers.filter((mark) => {
            // Check if the search term exists in any of the properties
            for (const prop in mark) {
                if (typeof mark[prop] === 'string' && mark[prop].toLowerCase().includes(markerFilter.toLowerCase())) {
                    return true;
                }
            }

            // If it doesn't exist remove it
            return false;
        })
    }

    return (
        <div className='w-full h-full flex justify-center items-center'>
            <MapContainer
                center={mapCanvasProps.center}
                zoom={mapCanvasProps.zoom}
                className='h-[80%] w-11/12 rounded-xl antialiased border-4 border-base-300 shadow-2xl shadow-gray-600'>

                {/* Change map based on theme */}
                {theme === 'dark' ? DarkCleanMap : LightCleanMap}

                {/* Handle events in map */}
                <MapEventHandler />


                {/* Display markers */}
                {markers && filteredMarkers().map((mark, index) => (
                    <Marker key={index} position={mark.latLng} icon={customIcon}>
                        <Popup>
                            <p>Name: {mark.name}</p>
                            <p>Message: {mark.message}</p>
                            <p>Type: {mark.type}</p>
                        </Popup>
                    </Marker>
                ))}

                {/* Display markers */}
                {/* {markers && markers.map((mark, index) => (
                    <Marker key={index} position={mark.latLng} icon={customIcon}>
                        <Popup>
                            <p>Name: {mark.name}</p>
                            <p>Message: {mark.message}</p>
                            <p>Type: {mark.type}</p>
                        </Popup>
                    </Marker>
                ))} */}

            </MapContainer>
        </div>

    )
}
