import { MapContainer, Popup, Marker } from 'react-leaflet'
import { useEffect, useState } from 'react'
import { useGlobalState, useReactQueries } from '../context/globalState'
import { DarkCleanMap, LightCleanMap, mapCanvasProps, customIcon, Watercolour } from './MapAssets'
import { convertToNaturalLanguage } from '../utils/helpers'

import 'leaflet/dist/leaflet.css'
import "leaflet-easybutton/src/easy-button.js";
import "leaflet-easybutton/src/easy-button.css";

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

    // Manage watercolour map button
    const [water, setWater] = useState(null)

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

        // Add click functionm to map, close open popups or open modal
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
                    lat: event.latlng.lat - (map.getMaxZoom() > 17 ? 0.001 : 0.002),
                    lng: event.latlng.lng
                }, map.getMaxZoom() > 17 ? 18 : 17)

                // Open form modal
                window.marker_form_modal.showModal()
            }
        })

        // Button to reveal watercolour map
        L.easyButton({
            states: [{
                stateName: 'watercolour-map',
                icon: '<div class="h-full flex justify-center items-center"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M384 476.1L192 421.2V35.9L384 90.8V476.1zm32-1.2V88.4L543.1 37.5c15.8-6.3 32.9 5.3 32.9 22.3V394.6c0 9.8-6 18.6-15.1 22.3L416 474.8zM15.1 95.1L160 37.2V423.6L32.9 474.5C17.1 480.8 0 469.2 0 452.2V117.4c0-9.8 6-18.6 15.1-22.3z"/></svg></div>',
                title: 'Watercolour map!',
                onClick: function (btn, map) {
                    setWater(true)
                    map.setZoom(map.getZoom() < 17 ? 15 : map.getZoom())
                    map.setMaxZoom(17)

                    btn.state('regular-map')
                }
            }, {
                stateName: 'regular-map',
                icon: '<div class="h-full flex justify-center items-center"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M565.6 36.2C572.1 40.7 576 48.1 576 56V392c0 10-6.2 18.9-15.5 22.4l-168 64c-5.2 2-10.9 2.1-16.1 .3L192.5 417.5l-160 61c-7.4 2.8-15.7 1.8-22.2-2.7S0 463.9 0 456V120c0-10 6.1-18.9 15.5-22.4l168-64c5.2-2 10.9-2.1 16.1-.3L383.5 94.5l160-61c7.4-2.8 15.7-1.8 22.2 2.7zM48 136.5V421.2l120-45.7V90.8L48 136.5zM360 422.7V137.3l-144-48V374.7l144 48zm48-1.5l120-45.7V90.8L408 136.5V421.2z"/></svg></svg></div>',
                title: 'Regular map',
                onClick: function (btn, map) {
                    setWater(false)
                    map.setMaxZoom(20)
                    btn.state('watercolour-map')
                }
            }]
        }).addTo(map);

        L.easyButton({
            states: [{
                stateName: 'locate',
                icon: '<div class="h-full flex justify-center items-center"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M429.6 92.1c4.9-11.9 2.1-25.6-7-34.7s-22.8-11.9-34.7-7l-352 144c-14.2 5.8-22.2 20.8-19.3 35.8s16.1 25.8 31.4 25.8H224V432c0 15.3 10.8 28.4 25.8 31.4s30-5.1 35.8-19.3l144-352z"/></svg></div>',
                title: 'Locate me',
                onClick: (btn) => {
                    navigator.geolocation.getCurrentPosition((position) => {
                        map.flyTo({ lat: position.coords.latitude, lng: position.coords.longitude }, map.getMaxZoom() > 17 ? 18 : 17, { animation: false });
                    }, () => {
                        btn.state('disabled')
                    }, {
                        enableHighAccuracy: false, timeout: 5000, maximumAge: Infinity
                    })
                }
            }, {
                stateName: 'disabled',
                icon: '<div class="h-full flex justify-center items-center"><svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z"/></svg></div>',
                title: 'Location services disabled',
                onClick: (btn) => {
                    navigator.geolocation.getCurrentPosition((position) => {
                        btn.state('locate')
                        map.flyTo({ lat: position.coords.latitude, lng: position.coords.longitude }, map.getMaxZoom() > 17 ? 18 : 17, { animation: false });
                    }, () => {

                    }, {
                        enableHighAccuracy: false, timeout: 5000, maximumAge: Infinity
                    })
                }
            }]
        }).addTo(map)
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
                {water ? Watercolour : theme === 'dark' ? DarkCleanMap : LightCleanMap}
                {/* {theme === 'dark' ? DarkCleanMap : LightCleanMap} */}

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

