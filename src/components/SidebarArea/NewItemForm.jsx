import { useEffect, useState } from "react";
import { fetchItems } from "../../services/itemListService";
import CategorySelector from "./CategorySelector"; // Importe o componente de seleção de categoria

function NewItemForm({ newItem, setNewItem, handleAddItem, categories, handleCreateCategory }) {
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState(""); // Valor do campo de entrada

  useEffect(() => {
    const loadItems = async () => {
      const fetchedItems = await fetchItems();
      setItems(fetchedItems); // Armazena os itens buscados
    };
    loadItems();
  }, []);

  // Filtra os itens conforme o valor digitado no input
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(inputValue.toLowerCase())
  );

  const handleInputChange = (e) => {
    setInputValue(e.target.value); // Atualiza o valor digitado
    setNewItem({ ...newItem, id: null, name: e.target.value }); // Atualiza o nome no estado
  };

  const handleSelectItem = (selectedItem) => {
    setInputValue(selectedItem.name); // Atualiza o valor do input
    setNewItem({
      ...newItem,
      id: selectedItem.id,
      name: selectedItem.name,
      observation: selectedItem.observation || "",
      category_id: selectedItem.category_id,
    });
  };

  const handleSubmit = () => {
    handleAddItem(newItem); // Passando o novo item para a função de adicionar
  };

  return (
    <div>
      <div className="relative mb-2">
        <input
          type="text"
          className="w-full p-2 border rounded"
          placeholder="Digite o nome do item"
          value={inputValue}
          onChange={handleInputChange}
        />
        {/* Exibe sugestões enquanto digita */}
        {inputValue && filteredItems.length > 0 && (
          <ul className="absolute bg-white border w-full mt-1 max-h-40 overflow-auto z-10">
            {filteredItems.map((item) => (
              <li
                key={item.id}
                className="p-2 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSelectItem(item)}
              >
                {item.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      <input
        type="text"
        className="w-full p-2 border rounded mb-2"
        placeholder="Observação (opcional)"
        value={newItem.observation}
        onChange={(e) =>
          setNewItem({ ...newItem, observation: e.target.value })
        }
      />

      {/* Colocando o CategorySelector após o campo de observação */}
      <CategorySelector
        categories={categories}
        onCategoryChange={(selectedCategory) =>
          setNewItem({ ...newItem, category_id: selectedCategory.id })
        }
        onCreateCategory={handleCreateCategory}
      />

      <button
        className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition duration-200 mb-2"
        onClick={handleSubmit}
      >
        Adicionar Item
      </button>
    </div>
  );
}

export default NewItemForm;
