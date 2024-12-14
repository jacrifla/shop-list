import React from 'react';

function AddItemForm({ newItem, setNewItem, handleAddItem }) {
  return (
    <div className="mb-4">
      <input
        type="text"
        className="w-full p-2 border rounded mb-2"
        placeholder="Nome do item"
        value={newItem.name}
        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
      />
      <input
        type="number"
        className="w-full p-2 border rounded mb-2"
        placeholder="Quantidade"
        value={newItem.quantity}
        onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
      />
      <input
        type="text"
        className="w-full p-2 border rounded mb-2"
        placeholder="Observação (opcional)"
        value={newItem.observation}
        onChange={(e) => setNewItem({ ...newItem, observation: e.target.value })}
      />
      <button
        className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition duration-200"
        onClick={handleAddItem}
      >
        Adicionar Item
      </button>
    </div>
  );
}

export default AddItemForm;
