import React from 'react';

function InputField({ label, type, value, onChange, placeholder }) {
  return (
    <div className="mb-6">
      <label className="block text-gray-700 font-semibold mb-2">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
      />
    </div>
  );
}

export default InputField;
