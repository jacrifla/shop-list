// ListItem.js
import React from 'react';

function ListItem({ list, items, onCheckboxChange }) {
  return (
    <ul>
      {items.map((item) => (
        <li
          key={item.id}
          className={`p-2 border rounded mb-2 ${item.checked ? 'line-through' : ''}`}
        >
          <label className="flex items-center">
            <input
              type="checkbox"
              className="mr-2"
              checked={item.checked}
              onChange={() => onCheckboxChange(item.id, !item.checked)}
            />
            {item.quantity} - {item.name}
          </label>
        </li>
      ))}
    </ul>
  );
}

export default ListItem;
