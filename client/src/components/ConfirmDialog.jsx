export default function ConfirmDialog({ message, onConfirm, onCancel }) {
  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="confirm-title">
      <div className="modal confirm-dialog">
        <div className="confirm-dialog__icon">🗑️</div>
        <h3 id="confirm-title" className="confirm-dialog__title">Are you sure?</h3>
        <p className="confirm-dialog__message">{message}</p>
        <div className="confirm-dialog__actions">
          <button className="btn btn--ghost" onClick={onCancel}>Cancel</button>
          <button className="btn btn--danger" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
}
