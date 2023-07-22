

import { MapContainer, Popup, Marker, useMapEvents, useMap } from 'react-leaflet'
import L from "leaflet";
import { useEffect, useState } from 'react'
import { useGlobalState, useReactQueries } from '../context/globalState'
import { DarkCleanMap, LightCleanMap, mapCanvasProps, customIcon, createCustomClusterIcon } from './MapAssets'
import { convertToNaturalLanguage, convertDateInput, cleanDateString } from '../utils/helpers'

import 'leaflet/dist/leaflet.css'
import "leaflet-easybutton/src/easy-button.js";
import "leaflet-easybutton/src/easy-button.css";
import "font-awesome/css/font-awesome.min.css";

export default function MapCanvas() {
    // Access global state
    const { theme, setLatLng, markerFilter, tempMarker, setTempMarker } = useGlobalState()

    // Access backend data through React Query
    const { markerQuery } = useReactQueries()

    // Manage popup state
    const [popupOpen, setPopupOpen] = useState(false)

    // Access map instance
    const [map, setMap] = useState(null)

    // Manage user geolocation
    const [userLoc, setUserLoc] = useState(null)

    // Refresh map on theme change
    useEffect(() => {

    }, [theme])

    // Get user's position on component load
    useEffect(() => {
        if (navigator.geolocation) {

            navigator.geolocation.getCurrentPosition((position) => {

                setUserLoc({ lat: position.coords.latitude, lng: position.coords.longitude })

            }, () => {
                console.log("Unable to retrieve your location")
            });
        } else {
            console.log("Geolocation not supported")
        }

    }, [])

    // Track changes to the map, like map start and map update
    useEffect(() => {
        // Confirm the map is loaded
        if (!map) return;

        // When map is clicked, close open popups or open modal
        map.on("click", (event) => {

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
                    lat: event.latlng.lat - 0.001,
                    lng: event.latlng.lng
                }, 18)

                // Open form modal
                window.marker_form_modal.showModal()
            }
        })

        // Check geolocation is supported
        if (navigator.geolocation) {
            // // While app is searching for user location, show spinning icon using leaflet-easy-button
            const loadingLoc = L.easyButton('<div class="flex justify-center items-center pt-[7px]"><span class="loading loading-spinner loading-xs"></span></div>', () => {

            }).addTo(map);

            // Find users location
            navigator.geolocation.getCurrentPosition(() => {

                // If user location found remove spinning icon
                loadingLoc.remove(map)

                // Add show-location button
                L.easyButton("fa-location-arrow", () => {
                    navigator.geolocation.getCurrentPosition((position) => {
                        map.flyTo({ lat: position.coords.latitude, lng: position.coords.longitude }, 18, { animation: false });
                    }, () => {
                        console.log("Unable to retrieve your location")
                    }, {
                        enableHighAccuracy: false, timeout: 5000, maximumAge: Infinity
                    })
                }).addTo(map)

            }, () => { // Error function to call if location services disabled
                loadingLoc.remove(map)
            }, {
                enableHighAccuracy: false, timeout: 5000, maximumAge: Infinity
            })
        }
    }, [map]);

    // Function to filter the markers
    const filteredMarkers = () => {
        return markerQuery.data.filter((mark) => {
            // Check if the search term exists in any of the properties
            for (const prop in mark) {
                if (['message', 'name', 'type'].includes(prop)
                    && typeof mark[prop] === 'string'
                    && mark[prop].toLowerCase().includes(markerFilter.toLowerCase())) {
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
                str = "italic text-xs text-secondary"
                break;
            case "Ships":
                str = "italic text-xs text-error"
                break;
            case "Goss":
                str = "italic text-xs text-success"
                break;
            case "Random":
                str = "italic text-xs text-info"
                break;
            case "Deeds":
                str = "italic text-xs text-warning"
                break;
            default:
                str = "italic text-xs text-white"
                break;
        }
        return str
    }

    return (
        <div className='w-full h-full flex justify-center items-center'>
            <MapContainer
                center={userLoc || mapCanvasProps.center}
                zoom={mapCanvasProps.zoom}
                ref={setMap}
                className='h-full w-11/12 rounded-xl antialiased shadow-2xl shadow-gray-600 cursor-pointer focus-visible:'>

                {/* Change map based on theme */}
                {theme === 'dark' ? DarkCleanMap : LightCleanMap}

                {/* Show temp marker when user clicks on map */}
                {tempMarker && <Marker position={tempMarker} icon={customIcon("")} />}

                {/* Show user location */}
                {userLoc && <Marker position={userLoc} icon={customIcon("user")} />}

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
                            <div className='font-bold bg-base-100 rounded-lg text-left w-max flex flex-col'>
                                <div className='bg-base-200 w-full rounded-t-lg p-2'>
                                    <span className={getTypeClassString(mark.type)}>{mark.type}</span>
                                    <span className='italic text-xs'> - {convertToNaturalLanguage(mark.createdAt)}</span>
                                </div>
                                <div className='w-full p-2 py-3 text-[1rem]'>
                                    <p className='text-violet-400 italic pl-2'>{mark.name}:</p>
                                    <p className='py-3 px-5 max-w-xs font-extrabold'>{mark.message}</p>
                                </div>

                            </div>
                        </Popup>
                    </Marker>
                ))}

            </MapContainer>
        </div>

    )
}

