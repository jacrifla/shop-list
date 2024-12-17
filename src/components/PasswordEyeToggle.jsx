import React from 'react';

function PasswordEyeToggle({ showPassword, togglePassword }) {
  return (
    <button
      type="button"
      onClick={togglePassword}
      className="absolute top-1/2 right-3 transform -translate-y-1/2"
    >
      {showPassword ? (
        <i className="fas fa-eye-slash"></i>
      ) : (
        <i className="fas fa-eye"></i>
      )}
    </button>
  );
}

export default PasswordEyeToggle;
