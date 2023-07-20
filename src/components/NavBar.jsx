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
        <header className="navbar bg-base-100 p-4 flex-col sm:flex-row">
            <div className="flex-1 min-w-fit pb-3 pl-5 sm:pb-0">
                <a className="normal-case text-xl font-bold">Northside tales</a>
            </div>
            <div className="flex-none gap-2 py-5">
                <div className="dropdown z-[9999]">
                    <label tabIndex={0} className="btn m-1" onClick={handleClick}>Message type</label>
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
                <ThemeChanger />
            </div>
        </header>
    )
}
