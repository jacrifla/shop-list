import React, { useEffect, useState } from "react";
import { fetchCategories, createCategory } from "../../services/categoriesService";
import { toast } from "react-toastify";
import CategorySelector from "./CategorySelector";
import NewItemForm from "./NewItemForm";

function AddItemForm({ newItem, setNewItem, handleAddItem }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

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
      <NewItemForm
        newItem={newItem}
        setNewItem={setNewItem}
        handleAddItem={handleAddItem}
        selectedCategory={selectedCategory}
      />
      <CategorySelector
        categories={categories}
        onCreateCategory={handleCreateCategory}
        onCategoryChange={setSelectedCategory}
      />
    </div>
  );
}

export default AddItemForm;
