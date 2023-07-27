import { useForm } from "react-hook-form"
import { useGlobalState, useReactQueries } from '../context/globalState'

export default function MapForm({ latLng }) {
    // Create marker query
    const { createMarker } = useReactQueries()

    // Access global temp marker setter
    const { setTempMarker } = useGlobalState()

    // Form management
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    // On form submit
    const onSubmit = (data) => {
        console.log(data)

        // Add clicked lat + long values to data object
        data.latLng = latLng

        // Add marker to global state
        createMarker.mutate(data)

        // Close modal
        window.marker_form_modal.close()

        // Clear temporary marker
        setTempMarker(false)

        // Reset form after 200 milliseconds so it doesn't look janky
        setTimeout(function () {
            // Reset form values
            reset()

            // Resent form height
            document.getElementById("formTextArea").style.height = "80px"
        }, 200)
    }

    // On modal close
    const clearModal = () => {
        // Clear temporary marker
        setTempMarker(false)

        // Reset form after 200 milliseconds so it doesn't look janky
        setTimeout(function () {
            // Reset form values
            reset()

            // Resent form height
            document.getElementById("formTextArea").style.height = "80px"
        }, 200)
    }

    return (
        <dialog id='marker_form_modal' className='modal'>
            <form
                autoComplete='off'
                onSubmit={handleSubmit(onSubmit)}
                method='dialog'
                className='modal-box rounded-lg w-60 sm:w-72'>
                <div className='flex flex-col gap-3 sm:gap-4'>
                    <p className="text-lg text-center text-violet-500">Leave a message!</p>

                    {/* Name input */}
                    <input
                        {...register('name', {
                            required: 'Name required',
                        })}
                        defaultValue=''
                        type='text'
                        className='input input-bordered input-sm sm:input-md w-full'
                        placeholder='Your name'
                        data-form-type="other"
                        autoComplete='off'
                    />

                    {/* Message input */}
                    <textarea
                        {...register('message', {
                            required: 'Message required',
                        })}
                        id="formTextArea"
                        className="textarea textarea-bordered textarea-sm sm:textarea-md w-full pb-0"
                        placeholder="Message"
                        data-form-type="other"
                        autoComplete='off'
                    />

                    {/* Type select */}
                    <select
                        {...register('type', {
                            required: 'Type required',
                        })}
                        className='select select-bordered select-sm sm:select-md w-full font-light'
                        required
                        defaultValue=""
                        data-form-type="other"
                        autoComplete='off'>

                        <option value="" disabled className="">Message type</option>
                        <option value="Vibe">Vibe</option>
                        <option value="Goss">Goss</option>
                        <option value="Deeds">Deeds</option>
                        <option value="Ships">Ships</option>
                        <option value="Random">Random</option>
                    </select>
                </div>

                <div className='modal-action mt-3 sm:mt-4'>
                    <button className='btn btn-accent btn-outline btn-sm sm:btn-md w-full normal-case'>
                        Add message!
                    </button>
                </div>

                <p className="text-sm mt-3 ml text-center">Click anywhere to close</p>

            </form>

            {/* second form with 'modal-backdrop' class covers the screen so we can close the modal when clicked outside */}
            <form method='dialog' className='modal-backdrop'>
                <button onClick={clearModal}>close</button>
            </form>
        </dialog>
    )
}