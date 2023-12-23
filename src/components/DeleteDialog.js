export default function DeleteDialog({ open, onClose, onDelete }) {
  return (
    <dialog
            open={open}
            style={{ top: '50%' }}
            onClose={onClose}
            className="border border-1 rounded bg-dark"
        >
          <div className="d-flex gap-3">
              <button
                  type="button"
                  onClick={onClose}
                  className="btn btn-secondary"
              >
                  Cancel
              </button>
              <button className="btn btn-danger" onClick={onDelete}>Delete</button>
          </div>
    </dialog>
  )
}