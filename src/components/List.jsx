import React from 'react';
import ListItem from './ListItem';

function List() {
  return (
    <div style={{ padding: '1rem' }}>
      <h2>Itens da Lista</h2>
      <button style={{ padding: '0.5rem 1rem', marginBottom: '1rem' }}>Adicionar Item</button>
      <div>
        <ListItem />
        <ListItem />
        <ListItem />
      </div>
    </div>
  );
}

export default List;
