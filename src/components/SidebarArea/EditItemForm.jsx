import React, { useState, useEffect, useMemo } from "react";
import CategorySelector from "./CategorySelector";
import { toast } from "react-toastify";
import { fetchCategories } from "../../services/categoriesService";

function EditItemForm({ item, categories, onCancel, onSave }) {
  const [editedItem, setEditedItem] = useState({ ...item });
  const [selectedCategory, setSelectedCategory] = useState("");  
  const [allCategories, setAllCategories] = useState([]);

  const memoizedCategories = useMemo(() => allCategories, [allCategories]);

  useEffect(() => {
    setEditedItem(item);
    setSelectedCategory(item.category_id);
  }, [item]);


  useEffect(() => {
    const loadCategories = async () => {
      const result = await fetchCategories();
      if (result.success) {
        setAllCategories(result.data);
      } else {
        toast.error(result.message);
      }
    };
    loadCategories();
  }, []);

  const handleSave = () => {
    if (!selectedCategory) {
      toast.error("Você precisa selecionar uma categoria.");
      return;
    }
    const updatedItem = { ...editedItem, category_id: selectedCategory };
    onSave(updatedItem);
  };

  return (
    <div className="mt-2">
      <input
        type="text"
        className="w-full p-2 border rounded mb-2"
        value={editedItem.name}
        onChange={(e) =>
          setEditedItem({ ...editedItem, name: e.target.value })
        }
      />
      <input
        type="text"
        className="w-full p-2 border rounded mb-2"
        value={editedItem.observation}
        onChange={(e) =>
          setEditedItem({ ...editedItem, observation: e.target.value })
        }
      />
      <CategorySelector
        categories={memoizedCategories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      <button
        className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition duration-200"
        onClick={handleSave}
      >
        Salvar
      </button>
      <button
        className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition duration-200 mt-2"
        onClick={onCancel}
      >
        Cancelar
      </button>
    </div>
  );
}

export default EditItemForm;
