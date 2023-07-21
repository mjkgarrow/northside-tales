import React, { useRef, useState } from 'react'
import ThemeChanger from './ThemeChanger'
import { useGlobalState } from '../context/globalState'

export default function NavBar() {
    const { markerFilter, setMarkerFilter } = useGlobalState()
    const [open, setOpen] = useState(false)
    const [markerButton, setMarketButton] = useState("Markers")
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

            // 
            button.textContent = title
            // setMarketButton(title)

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

    return (
        <header className="navbar bg-base-100 p-2 sm:p-5 flex-col sm:flex-row">
            <div className="flex-1 min-w-fit sm:pl-4">
                <a className="normal-case text-2xl font-bold">Northside tales</a>
            </div>
            <div className="flex-none gap-2 py-0">
                {/* Search bar */}
                <div className="form-control">
                    <input
                        autoFocus
                        ref={searchInput}
                        id='searchBar'
                        onChange={changeFilter}
                        type="text"
                        placeholder="Search"
                        className="input input-bordered input-sm sm:input-md w-28" />
                </div>

                {/* Marker drop down */}
                <div className="dropdown z-[9999]">
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
                <button className="btn rounded-full btn-sm sm:btn-md" onClick={() => window.my_modal_2.showModal()}>info</button>

                {/* Info modal */}
                <dialog id="my_modal_2" className="modal">
                    <form method="dialog" className="modal-box w-fit text-center p-4">
                        <h3 className="font-bold text-lg text-violet-500">Hi, welcome to Northside Tales!</h3>
                        <div className='absolute right-16 top-12'>
                            <svg width="32" height="32" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M12 10c-1.104 0-2-.896-2-2s.896-2 2-2 2 .896 2 2-.896 2-2 2m0-5c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3m-7 2.602c0-3.517 3.271-6.602 7-6.602s7 3.085 7 6.602c0 3.455-2.563 7.543-7 14.527-4.489-7.073-7-11.072-7-14.527m7-7.602c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602" className="fill-white scale-75" /></svg>
                        </div>
                        <p className="py-2 font-medium text-left text-sm">Click on the map to place a marker
                            <br></br>
                            and leave a message for everyone to see.</p>
                        <p className="py-2 font-medium text-left text-base">The types of messages:</p>
                        <p className="py-2 font-medium text-left text-secondary text-sm">Vibe - party out back 🥳</p>
                        <p className="py-2 font-medium text-left text-success text-sm">Goss - spill it 🙊</p>
                        <p className="py-2 font-medium text-left text-error text-sm">Ships - bump into a cutie ❤️</p>
                        <p className="py-2 font-medium text-left text-info text-sm">Random - wacky tales 🤪</p>
                        <p className="py-2 font-medium text-left text-warning text-sm">Deeds - a good deed to help the community 😇</p>
                    </form>
                    <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                    </form>
                </dialog>

                <ThemeChanger />
            </div>
        </header>
    )
}
