import React from 'react';
import ListItem from './ListItem';

function Sidebar({ lists }) {
  return (
    <aside className="w-64 bg-gray-100 p-4 shadow-md">
      <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200 mb-4">
        Novo Item
      </button>
      <ul className="space-y-2">
        {lists.map((list, index) => (
          <li
            key={index}
            className="p-2 bg-white rounded shadow hover:bg-gray-50 transition duration-200"
          >
            <h3 className="font-semibold">{list.name}</h3>
            {list.items.map((item, itemIndex) => (
              <ListItem key={itemIndex} label={item} />
            ))}
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;
