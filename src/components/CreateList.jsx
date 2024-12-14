import React from 'react';

const CreateList = ({ newListName, setNewListName, handleCreateList }) => (
  <div className="flex mb-4">
    <input
      type="text"
      value={newListName}
      onChange={(e) => setNewListName(e.target.value)}
      placeholder="Digite o nome da nova lista"
      className="border border-gray-300 p-2 rounded mr-2"
    />
    <button
      onClick={handleCreateList}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    >
      Adicionar Lista
    </button>
  </div>
);

export default CreateList;
