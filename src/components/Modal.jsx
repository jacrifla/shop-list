import React from "react";

function Modal({ title, onCancel, onConfirm, confirmText, cancelText, children }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded shadow w-96 relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onCancel}
        >
          <i className="fas fa-times"></i>
        </button>
        <h4 className="text-lg font-semibold mb-4">{title}</h4>
        {children}
        <div className="flex justify-end space-x-2">
          {onConfirm && (
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
              onClick={onConfirm}
            >
              {confirmText || "Confirmar"}
            </button>
          )}
          <button
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
            onClick={onCancel}
          >
            {cancelText || "Cancelar"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
