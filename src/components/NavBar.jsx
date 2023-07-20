import React, { useRef, useState, useEffect } from 'react'
import ThemeChanger from './ThemeChanger'
import { useGlobalState } from '../context/globalState'

export default function NavBar() {
    const { markerFilter, setMarkerFilter } = useGlobalState()
    const [open, setOpen] = useState(false)
    const searchInput = useRef(null)


    const changeFilter = (event) => {
        setMarkerFilter(event.target.value)
        handleClick()
    }

    const handleClick = () => {
        if (open) {
            const elem = document.activeElement;
            if (elem) {
                elem?.blur();
            }
        }
        setOpen(!open)
    };

    useEffect(() => {
        searchInput.current.focus();
    }, [markerFilter]);



    return (
        <header className="navbar bg-base-100 p-2 sm:p-4 flex-col sm:flex-row">
            <div className="flex-1 min-w-fit sm:pl-4">
                <a className="normal-case text-2xl font-bold">Northside tales</a>
            </div>
            <div className="flex-none gap-2 py-0 sm:py-5">
                <div className="dropdown z-[9999]">
                    <label tabIndex={0} className="btn" onClick={handleClick}>Markers</label>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li><button onClick={changeFilter} value="">All markers</button></li>
                        <li><button onClick={changeFilter} value="vibe">Vibes</button></li>
                        <li><button onClick={changeFilter} value="ships passing">Ships passing</button></li>
                        <li><button onClick={changeFilter} value="goss">Goss</button></li>
                        <li><button onClick={changeFilter} value="random">Random</button></li>
                    </ul>
                </div>

                <div className="form-control">
                    <input
                        autoFocus
                        ref={searchInput}
                        id='searchBar'
                        onChange={changeFilter}
                        type="text"
                        placeholder="Search"
                        className="input input-bordered w-28" />
                </div>
                <button className="btn rounded-full" onClick={() => window.my_modal_2.showModal()}>info</button>
                <dialog id="my_modal_2" className="modal">
                    <form method="dialog" className="modal-box w-56 text-center p-4">
                        <h3 className="font-bold text-xl text-secondary">Hello!</h3>
                        <p className="py-2 font-medium">Click on the map to place a marker and leave a message for everyone to see!</p>
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
