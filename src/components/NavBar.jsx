import React, { useEffect, useRef, useState } from 'react'
import ThemeChanger from './ThemeChanger'
import { useGlobalState } from '../context/globalState'
import InfoModal from './InfoModal'

export default function NavBar() {
    const { setMarkerFilter } = useGlobalState()
    const [open, setOpen] = useState(false)
    const [searching, setSearching] = useState(false)
    const searchInput = useRef(null)

    // Update filter on change
    const changeFilter = (event) => {
        const button = document.querySelector('#markerButtonLabel')

        // If the buttons were clicked, update the button text
        if (event.type === 'click') {
            let title
            // Add an 's' to vibe
            switch (event.target.value) {
                case 'vibe':
                    button.classList.value = 'btn btn-sm btn-secondary sm:btn-md'
                    title = 'vibes'
                    break;
                case 'goss':
                    button.classList.value = 'btn btn-sm btn-success sm:btn-md'
                    title = 'goss'
                    break;

                case 'deeds':
                    button.classList.value = 'btn btn-sm btn-warning sm:btn-md'
                    title = 'deeds'
                    break;

                case 'ships':
                    button.classList.value = 'btn btn-sm btn-error sm:btn-md'
                    title = 'ships'
                    break;

                case 'random':
                    button.classList.value = 'btn btn-sm btn-info sm:btn-md'
                    title = 'random'
                    break;

                default:
                    button.classList.value = 'btn btn-sm sm:btn-md'
                    title = 'markers'
                    break;
            }

            // Apply title to button content
            button.textContent = title

            // Apply the new filter
            setMarkerFilter(event.target.value)

            // Close the dropdown
            handleClick()

            // Clear the searchbar text 
            searchInput.current.value = ""

        } else {
            // If search bar used, make sure to keep it focused while the components update
            searchInput.current.focus()
            setMarkerFilter(event.target.value)
        }
    }

    // Handle opening/closing of dropdown from the button
    const handleClick = () => {
        if (open) {
            document.activeElement?.blur();
        }
        setOpen(!open)
    };

    useEffect(() => {
        const returnUser = localStorage.getItem("northsideTales")

        if (!returnUser) {
            window.info_modal.showModal()

            localStorage.setItem("northsideTales", "true")
        }
    }, [])

    return (
        <header className="navbar bg-base-100 px-0 py-3 sm:py-5 flex-col sm:flex-row w-11/12 self-center">
            {/* App title */}
            <div className="flex-1 min-w-fit">
                <a className="normal-case text-2xl font-bold text-sky-500">Northside tales</a>
            </div>

            <div className="py-0 z-[9999] flex justify-center sm:justify-end w-full">
                <div className='flex gap-3'>
                    {/* Marker drop down */}
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-sm sm:btn-md" id="markerButtonLabel" onClick={handleClick}>Markers</label>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                            <li><button onClick={changeFilter} value="">All markers</button></li>
                            <li><button onClick={changeFilter} value="vibe">Vibes</button></li>
                            <li><button onClick={changeFilter} value="goss">Goss</button></li>
                            <li><button onClick={changeFilter} value="deeds">Deeds</button></li>
                            <li><button onClick={changeFilter} value="ships">Ships</button></li>
                            <li><button onClick={changeFilter} value="random">Random</button></li>
                        </ul>
                    </div>

                    {/* Button to open info modal */}
                    <button className="btn btn-sm sm:btn-md" onClick={() => window.info_modal.showModal()}>info</button>

                    {/* Info modal */}
                    <InfoModal />

                    {/* Search bar */}
                    <div className="form-control w-28">
                        <input
                            autoFocus
                            ref={searchInput}
                            id='searchBar'
                            onChange={changeFilter}
                            type="text"
                            placeholder="Search..."
                            className="input input-bordered input-sm sm:input-md" />
                    </div>

                    {/* Theme changer icon */}
                    <ThemeChanger />
                </div>
            </div>
        </header>
    )
}


// {
//     searching ?
//         <div className="form-control">
//             <input
//                 autoFocus
//                 ref={searchInput}
//                 id='searchBar'
//                 onChange={changeFilter}
//                 type="text"
//                 placeholder="Search markers..."
//                 className="input input-bordered input-sm sm:input-md w-40" />
//         </div>
//         :
//         <div className='w-8 h-8 flex justify-center items-center' onClick={() => setSearching(true)}>
//             <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" className='fill-base-content'><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" /></svg>
//         </div>
// }