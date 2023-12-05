import { useState } from 'react'

export function SaveDialog({ open, onClose, onSubmit }) {
    const [name, setName] = useState('')

    const handleOnSubmit = (event) => {
        event.preventDefault() // TODO Marto reed why we do that with forms
        onSubmit(name)
        setName('')
    }

    // TODO make that look beautiful with bootstrap
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
                        value={name}
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
