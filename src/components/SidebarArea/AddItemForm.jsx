import React, { useEffect, useState } from "react";
import { createCategory, fetchCategories } from "../../services/categoriesService";
import { toast } from "react-toastify";
import NewItemForm from "./NewItemForm";

function AddItemForm({ newItem, setNewItem, handleAddItem }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadCategories = async () => {
      const result = await fetchCategories();
      if (result.success) {
        setCategories(result.data);
      } else {
        toast.error(result.message);
      }
    };
    loadCategories();
  }, []);

  const handleCreateCategory = async (name, description) => {
    const result = await createCategory(name, description);
    if (result.success) {
      toast.success("Categoria criada com sucesso!");
      setCategories((prev) => [...prev, result.data]);
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="mb-4">
      {/* Passando a função handleCreateCategory para o NewItemForm */}
      <NewItemForm
        newItem={newItem}
        setNewItem={setNewItem}
        handleAddItem={handleAddItem}
        categories={categories}
        handleCreateCategory={handleCreateCategory} // Passando a função aqui
      />
    </div>
  );
}

export default AddItemForm;
