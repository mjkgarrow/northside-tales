import React from 'react'
import { useGlobalState } from '../context/globalState'
import MapCanvas from '../components/MapCanvas'
import MapForm from '../components/MapForm'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'

export default function HomePage() {
    const { latLng } = useGlobalState()

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
