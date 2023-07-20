import { useForm } from "react-hook-form"
import { useGlobalState } from '../context/globalState'

export default function MapForm({ latLng }) {
    const { markers, setMarkers } = useGlobalState()

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
        setMarkers((prev) => [...prev, data])

        // Reset form values
        reset()

        // Close modal
        window.meeting_modal_create.close()

        // Reset textarea height after 200 milliseconds so it doesn't look janky
        setTimeout(function () { document.getElementById("formTextArea").style.height = "102px" }, 200)
    }

    // On modal close
    const clearModal = () => {
        // Reset form values
        reset()

        // Reset textarea height after 200 milliseconds so it doesn't look janky
        setTimeout(function () { document.getElementById("formTextArea").style.height = "102px" }, 200)
    }

    return (
        <dialog id='meeting_modal_create' className='modal'>
            <form
                onSubmit={handleSubmit(onSubmit)}
                method='dialog'
                className='modal-box rounded-lg w-64'>
                <div className='space-y-4'>
                    <input
                        {...register('name', {
                            required: 'Name required',
                        })}
                        defaultValue=''
                        type='text'
                        className='input input-bordered w-full'
                        placeholder='Your name'
                    />
                    {errors.name && (
                        <div className='alert alert-error rounded-md'>
                            {errors.name.message}
                        </div>
                    )}

                    <textarea
                        {...register('message', {
                            required: 'Message required',
                        })}
                        id="formTextArea"
                        className="textarea textarea-bordered w-full"
                        placeholder="Message"
                        rows="3"
                    />

                    {errors.message && (
                        <div className='alert alert-error rounded-md'>
                            {errors.message.message}
                        </div>
                    )}

                    <select
                        {...register('type', {
                            required: 'Type required',
                        })}
                        className='input input-bordered w-full'
                        required
                        defaultValue="">

                        <option value="" disabled>Message type</option>
                        <option value="vibe">Vibe</option>
                        <option value="ships">Ships passing</option>
                        <option value="gossip">Goss</option>
                        <option value="random">Random</option>
                    </select>
                    {errors.type && (
                        <div className='alert alert-error rounded-md'>
                            {errors.type.message}
                        </div>
                    )}

                    {errors?.backendErrors && errors.backendErrors.message.map((error, index) => {
                        return <div key={index} className='alert alert-error rounded-md'>{error}</div>
                    })}
                </div>

                <div className='modal-action'>
                    {/* if there is a button in form, it will close the modal */}
                    <button className='btn btn-accent w-full normal-case'>
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