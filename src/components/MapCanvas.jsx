import 'leaflet/dist/leaflet.css'
import { MapContainer, Popup, Marker, useMapEvents } from 'react-leaflet'
import { useEffect, useState } from 'react'
import { useGlobalState, useReactQueries } from '../context/globalState'
import { DarkCleanMap, LightCleanMap, mapCanvasProps, customIcon, createCustomClusterIcon } from './MapAssets'
import LoadingIcon from './LoadingIcon'

export default function MapCanvas() {
    // Access global state
    const { theme, setLatLng, markerFilter, tempMarker, setTempMarker } = useGlobalState()

    // Access backend data through React Query
    const { markerQuery } = useReactQueries()

    // Manage popup state
    const [popupOpen, setPopupOpen] = useState(false)

    // Refresh map on theme change
    useEffect(() => {

    }, [theme])

    // Handle map events
    function MapEventHandler() {
        const map = useMapEvents({
            // On click, open modal
            click: (event) => {

                // Set latLng data to global context
                setLatLng(event.latlng)

                // Manage popup closing on map click
                if (popupOpen) {
                    setPopupOpen(false)

                    // Open form on clean map click
                } else {
                    // Create a temporary marker
                    setTempMarker(event.latlng)

                    // Fly map to clicked location
                    map.flyTo({
                        lat: event.latlng.lat - 0.002,
                        lng: event.latlng.lng
                    }, 17)

                    // Open form modal
                    window.meeting_modal_create.showModal()
                }
            },
        })
    }

    // Function to filter the markers
    const filteredMarkers = () => {
        return markerQuery.data.filter((mark) => {
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

    const getTypeClassString = (type) => {
        let str
        switch (type) {
            case "Vibe":
                str = "italic text-purple-500"
                break;
            case "Ships passing":
                str = "italic text-red-500"
                break;
            case "Goss":
                str = "italic text-green-500"
                break;
            case "Random":
                str = "italic text-blue-500"
                break;
            default:
                str = "italic text-white"
                break;
        }
        return str
    }

    // Show loading animation while data loads
    if (markerQuery.isLoading) return <LoadingIcon />

    return (
        <div className='w-full h-full flex justify-center items-center'>
            <MapContainer
                center={mapCanvasProps.center}
                zoom={mapCanvasProps.zoom}
                className='h-full w-11/12 rounded-xl antialiased shadow-2xl shadow-gray-600 cursor-pointer'>

                {/* Change map based on theme */}
                {theme === 'dark' ? DarkCleanMap : LightCleanMap}

                {/* Handle events in map */}
                <MapEventHandler />

                {/* Show temp marker when user clicks on map */}
                {tempMarker && <Marker position={tempMarker} icon={customIcon("")} />}

                {/* Display markers */}
                {markerQuery.data && filteredMarkers().map((mark, index) => (
                    <Marker key={index} position={mark.latLng} icon={customIcon(mark.type)}
                        eventHandlers={{
                            click: (e) => {
                                setPopupOpen(!popupOpen)
                            }
                        }}>
                        <Popup
                            closeButton={false}>
                            <div className='font-bold text-sm bg-base-200 px-4 py-2 rounded-lg text-left min-w-[130px] flex flex-col'>
                                <p className='text-secondary italic'>{mark.name}</p>
                                <p className='py-2'>{mark.message}</p>
                                <p className={getTypeClassString(mark.type)}>{mark.type}</p>
                            </div>
                        </Popup>
                    </Marker>
                ))}

            </MapContainer>
        </div>

    )
}