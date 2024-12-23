import React, { useState } from "react";
import { toast } from "react-toastify";

function CategorySelector({
  categories,
  onCreateCategory,
  onCategoryChange,
  selectedCategory,
}) {
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryDescription, setNewCategoryDescription] = useState("");
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);

  const handleCreateCategory = () => {
    if (!newCategoryName) {
      toast.error("Nome da nova categoria é obrigatório.");
      return;
    }
    onCreateCategory(newCategoryName, newCategoryDescription);
    setNewCategoryName("");
    setNewCategoryDescription("");
    setIsCreatingCategory(false);
  };

  // Verificação para garantir que categories seja um array válido
  const validCategories = Array.isArray(categories) ? categories : [];

  return (
    <div className="mb-2">
      {!isCreatingCategory ? (
        <div className="flex items-center">
          <select
            className="w-full p-2 border rounded"
            value={selectedCategory}
            onChange={(e) => {
              const selected = e.target.value;
              onCategoryChange(selected);
            }}
          >
            <option value="">Selecione uma categoria</option>
            {validCategories.map((category) => (
              <option
                key={category.id}
                value={category.id}
                title={category.description}
              >
                {category.name}
              </option>
            ))}
          </select>

          <button
            className="ml-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
            onClick={() => setIsCreatingCategory(true)}
          >
            +
          </button>
        </div>
      ) : (
        <>
          <input
            type="text"
            className="w-full p-2 border rounded mb-2"
            placeholder="Nome da nova categoria"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
          />
          <textarea
            className="w-full p-2 border rounded mb-2"
            placeholder="Descrição da nova categoria (opcional)"
            value={newCategoryDescription}
            onChange={(e) => setNewCategoryDescription(e.target.value)}
          />
          <button
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition duration-200 mb-2"
            onClick={handleCreateCategory}
          >
            Criar Categoria
          </button>
          <button
            className="w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-600 transition duration-200"
            onClick={() => setIsCreatingCategory(false)}
          >
            Cancelar
          </button>
        </>
      )}
    </div>
  );
}

export default CategorySelector;
