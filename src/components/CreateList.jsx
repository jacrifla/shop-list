import React from 'react';

const CreateList = ({ newListName, setNewListName, handleCreateList }) => (
  <div className='flex flex-col md:flex-row mb-4 gap-2'>
    <input
      type='text'
      value={newListName}
      onChange={(e) => setNewListName(e.target.value)}
      placeholder='Digite o nome da nova lista'
      className='w-full md:w-2/3 border border-gray-300 p-2 rounded'
    />
    <button
      onClick={handleCreateList}
      className='w-full md:w-1/3 bg-gray-700 text-white px-4 py-2 rounded hover:bg-blue-950 transition duration-200'
    >
      Adicionar Lista
    </button>
  </div>
);

export default CreateList;
