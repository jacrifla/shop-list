// InputField.js
import React from 'react';
import PasswordEyeToggle from './PasswordEyeToggle';

function InputField({ label, type, value, onChange, placeholder, showPassword, togglePassword, ...props }) {
  return (
    <div className="mb-6">
      <label className="block text-gray-700 font-semibold mb-2">{label}</label>
      <div className="relative">
        <input
          type={type === 'password' && showPassword ? 'text' : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500 pr-10"
          {...props}
        />
        {type === 'password' && (
          <PasswordEyeToggle
            showPassword={showPassword}
            togglePassword={togglePassword}
          />
        )}
      </div>
    </div>
  );
}

export default InputField;
