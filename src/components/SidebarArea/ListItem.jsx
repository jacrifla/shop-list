import React from 'react';

function ListItem({ items, onCheckboxChange }) {
  return (
    <ul className="space-y-4">
      {items.map((item) => (
        <li
          key={item.id}
          className={`p-4 border rounded-lg shadow-sm bg-white transition duration-300 ease-in-out transform hover:scale-105 ${
            item.checked ? 'bg-green-100' : 'bg-gray-100'
          }`}
        >
          <label className="flex items-center">
            <input
              type="checkbox"
              className="mr-4 w-5 h-5 text-blue-500 rounded focus:ring-blue-300"
              checked={item.checked}
              onChange={() => onCheckboxChange(item.id, !item.checked)}
            />
            <div className="flex flex-col">
              <span
                className={`font-medium ${item.checked ? 'line-through text-gray-500' : ''}`}
              >
                {item.quantity}x {item.name}
              </span>
              {item.observation && (
                <span className="text-sm text-gray-600">{item.observation}</span>
              )}
            </div>
          </label>
        </li>
      ))}
    </ul>
  );
}

export default ListItem;
