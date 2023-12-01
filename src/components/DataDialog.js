import { useState } from "react"

export function DataDialog ({ open, onClose, onSubmit, data }) {
  const [selected, setSelected] = useState(null)

  const handleOnSubmit = (event) => {
    event.preventDefault() // TODO Marto reed why we do that with forms
    onSubmit(data.find(({ name }) => name === selected))
  }
  
  // TODO make that look beautiful with bootstrap
  return (
    <dialog open={open} style={{ top: '50%'}} onClose={onClose}>
      <form onSubmit={handleOnSubmit}>
        <p>Select name:</p>
        <select value={selected} onChange={({ target: { value }}) => setSelected(value)}>
          {
            data.map(({ name }) => <option key={name} value={name}>{name}</option>)
          }
        </select>
        <br/>
        <button type='button' onClick={onClose}>Cancel</button>
        <button>Load</button>
      </form>
    </dialog>
  )
}