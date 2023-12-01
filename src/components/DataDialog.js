import { useState } from 'react'

export function DataDialog({ open, onClose, onSubmit, data }) {
    const [selected, setSelected] = useState(null)

    const handleOnSubmit = (event) => {
        event.preventDefault() // TODO Marto reed why we do that with forms
        onSubmit(data.find(({ name }) => name === selected))
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
                    <p className="form-label">Select name:</p>
                    <select
                        value={selected}
                        onChange={({ target: { value } }) => setSelected(value)}
                        className="form-select"
                        aria-label="Small select example"
                    >
                        {data.map(({ name }) => (
                            <option key={name} value={name}>
                                {name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="d-flex gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="btn btn-secondary"
                    >
                        Cancel
                    </button>
                    <button className="btn btn-secondary">Load</button>
                </div>
            </form>
        </dialog>
    )
}
