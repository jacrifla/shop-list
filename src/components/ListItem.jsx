import React from 'react';

function ListItem({ label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
      <input type="checkbox" style={{ marginRight: '1rem' }} />
      <span>{label}</span>
    </div>
  );
}

export default ListItem;
