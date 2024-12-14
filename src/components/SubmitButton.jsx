import React from 'react';

function SubmitButton({ loading, children }) {
  return (
    <button
      type="submit"
      className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600 transition duration-300"
      disabled={loading}
    >
      {loading ? 'Carregando...' : children}
    </button>
  );
}

export default SubmitButton;
