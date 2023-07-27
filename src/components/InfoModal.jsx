import React from 'react'

export default function InfoModal() {
    return (
        < dialog id="info_modal" className="modal" >
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
                <br />
                <div className='w-full flex justify-center -mt-4'>
                    <a href='https://github.com/mjkgarrow' className='' target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" height="25px" viewBox="0 0 96 96" className="fill-neutral-content hover:fill-primary-content transition-all duration-75 ease-in-out"><path fillRule="evenodd" clipRule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z" /></svg>
                    </a>
                </div>
            </form>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog >
    )
}
