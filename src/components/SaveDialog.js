import { useState } from "react"

export function SaveDialog ({ open, onClose, onSubmit }) {
  const [name, setName] = useState('')

  const handleOnSubmit = (event) => {
    event.preventDefault() // TODO Marto reed why we do that with forms
    onSubmit(name)
  }
  
  // TODO make that look beautiful with bootstrap
  return (
    <dialog open={open} style={{ top: '50%'}} onClose={onClose}>
      <form onSubmit={handleOnSubmit}>
        <p>Add name:</p>
        <input type='text' value={name} onChange={({ target: { value }}) => setName(value)}/>
        <br/>
        <button type='button' onClick={onClose}>Cancel</button>
        <button>Save</button>
      </form>
    </dialog>
  )
}