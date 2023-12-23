import { useEffect, useState } from 'react'

export default function SaveDialog({ open, onClose, onSubmit, selected }) {
    const [name, setName] = useState('')

    const handleOnSubmit = (event) => {
        event.preventDefault()
        onSubmit(name)
        setName('')
    }

    useEffect(() => {
        setName(selected)
    }, [selected])

    return (
        <dialog
            open={open}
            style={{ top: '50%' }}
            onClose={onClose}
            className="border border-1 rounded bg-dark"
        >
            <form onSubmit={handleOnSubmit} className="d-grid gap-3">
                <div>
                    <p className="form-label text-light">Add name:</p>
                    <input
                        className="form-control"
                        type="text"
                        value={name ?? ''}
                        onChange={({ target: { value } }) => setName(value)}
                    />
                </div>

                <div className="d-flex gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="btn btn-secondary"
                    >
                        Cancel
                    </button>
                    <button className="btn btn-secondary">Save</button>
                </div>
            </form>
        </dialog>
    )
}
