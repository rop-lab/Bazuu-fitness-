// ConfirmationDialog.js
import React from 'react';

function ConfirmationDialog({ isOpen, onClose, onConfirm, message }) {
  if (!isOpen) return null;

  return (
    <div className="confirmation-dialog" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 999 }}>
      <div className="confirmation-dialog-content" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', borderRadius: '5px' }}>
        <p style={{ marginBottom: '20px', color: 'black', fontSize: '20px' }}>{message}</p>
        <div className="button-container">
          <button onClick={onConfirm} className="form-button" style={{ marginRight: '10px' }}>Confirm</button>
          <button onClick={onClose} className="delete-button">Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationDialog;
