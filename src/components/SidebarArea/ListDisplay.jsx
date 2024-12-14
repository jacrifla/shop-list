import React from 'react';

function ListDisplay({ lists, selectedListId, onListSelect }) {
  return (
    <div className="flex-1 overflow-y-auto">
      {lists.map((list) => (
        <div
          key={list.id}
          className={`p-1 rounded cursor-pointer ${selectedListId === list.id ? 'bg-blue-200' : ''}`}
          onClick={() => onListSelect(list.id)}
        >
          {list.name}
        </div>
      ))}
    </div>
  );
}

export default ListDisplay;
