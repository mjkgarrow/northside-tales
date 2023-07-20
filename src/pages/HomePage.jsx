import React from 'react'
import { useGlobalState, useReactQueries } from '../context/globalState'
import MapCanvas from '../components/MapCanvas'
import MapForm from '../components/MapForm'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import LoadingIcon from '../components/LoadingIcon'

export default function HomePage() {
    // Access lat and long data from global context
    const { latLng } = useGlobalState()

    // Access backend data through React Query
    const { markerQuery } = useReactQueries()

    // Show loading animation while data loads
    if (markerQuery.isLoading) return <LoadingIcon />

    return (
        <div className='w-screen h-screen flex flex-col'>
            <NavBar />
            <main className='w-screen flex-grow'>
                <MapForm latLng={latLng} />
                <MapCanvas />
            </main>
            <Footer />
        </div>
    )
}
