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

        // Reset form values
        reset()

        // Close modal
        window.meeting_modal_create.close()

        // Clear temporary marker
        setTempMarker(false)

        // Reset textarea height after 200 milliseconds so it doesn't look janky
        setTimeout(function () { document.getElementById("formTextArea").style.height = "102px" }, 200)
    }

    // On modal close
    const clearModal = () => {
        // Reset form values
        reset()

        // Clear temporary marker
        setTempMarker(false)

        // Reset textarea height after 200 milliseconds so it doesn't look janky
        setTimeout(function () { document.getElementById("formTextArea").style.height = "102px" }, 200)
    }

    return (
        <dialog id='meeting_modal_create' className='modal'>
            <form
                onSubmit={handleSubmit(onSubmit)}
                method='dialog'
                className='modal-box rounded-lg w-60 sm:w-72'>
                <div className='flex flex-col gap-3 sm:gap-4'>
                    {/* Name input */}
                    <input
                        {...register('name', {
                            required: 'Name required',
                        })}
                        defaultValue=''
                        type='text'
                        className='input input-bordered input-sm sm:input-md w-full'
                        placeholder='Your name'
                    />

                    {/* Message input */}
                    <textarea
                        {...register('message', {
                            required: 'Message required',
                        })}
                        id="formTextArea"
                        className="textarea textarea-bordered textarea-sm sm:textarea-md w-full pb-0"
                        placeholder="Message"
                    />

                    {/* Type select */}
                    <select
                        {...register('type', {
                            required: 'Type required',
                        })}
                        className='select select-bordered select-sm sm:select-md w-full'
                        required
                        defaultValue="">

                        <option value="" disabled>Message type</option>
                        <option value="Vibe">Vibe</option>
                        <option value="Ships passing">Ships passing</option>
                        <option value="Goss">Goss</option>
                        <option value="Random">Random</option>
                    </select>
                </div>

                <div className='modal-action mt-3 sm:mt-4'>
                    <button className='btn btn-accent btn-sm sm:btn-md w-full normal-case'>
                        Add message!
                    </button>
                </div>
            </form>

            {/* second form with 'modal-backdrop' class covers the screen so we can close the modal when clicked outside */}
            <form method='dialog' className='modal-backdrop'>
                <button onClick={clearModal}>close</button>
            </form>
        </dialog>
    )
}