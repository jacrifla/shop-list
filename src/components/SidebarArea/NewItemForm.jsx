function NewItemForm({ newItem, setNewItem, handleAddItem, selectedCategory }) {
    return (
      <div>
        <input
          type="text"
          className="w-full p-2 border rounded mb-2"
          placeholder="Nome do item"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
        />
        <input
          type="text"
          className="w-full p-2 border rounded mb-2"
          placeholder="Observação (opcional)"
          value={newItem.observation}
          onChange={(e) => setNewItem({ ...newItem, observation: e.target.value })}
        />
        <button
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition duration-200 mb-2"
          onClick={() => handleAddItem(selectedCategory)}
        >
          Adicionar Item
        </button>
      </div>
    );
  }
  
  export default NewItemForm;