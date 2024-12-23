import React from 'react';
import ListItemRow from './ListItemRow';

function ListItem({ items, onCheckboxChange, setItems }) {
  return (
    <ul className="space-y-4 p-0 m-0 list-none">
      {items.map((item) => (
        <ListItemRow
          key={item.id}
          item={item}
          onCheckboxChange={onCheckboxChange}
          setItems={setItems}
        />
      ))}
    </ul>
  );
}

export default ListItem;
