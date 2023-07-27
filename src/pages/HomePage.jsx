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

    if (markerQuery.error) return (
        <div className='w-full h-screen flex justify-center items-center text-center'>
            Hmmm... there seems to be an error, sorry! 😢
            <br />
            Check back later. ❤️
        </div>
    )

    return (
        <div className='w-screen h-screen flex flex-col'>
            <NavBar />
            <main className='w-screen flex-grow'>
                <MapForm latLng={latLng} />
                <MapCanvas />
            </main>
            {/* <Footer /> */}
        </div>
    )
}
