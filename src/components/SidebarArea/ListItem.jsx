import React, { useState } from 'react';
import { updateItem } from '../../services/itemListService';

function ListItem({ items, onCheckboxChange, setItems }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedItem, setEditedItem] = useState({});

  // Função para atualizar o item
  const handleEditItem = async (item) => {
    setIsEditing(true);
    setEditedItem(item);
  };

  const handleSaveItem = async () => {
    try {
      const updatedItem = await updateItem(editedItem.id, editedItem);
      if (updatedItem.success) {
        // Atualize o estado dos itens com a versão atualizada
        setItems((prevItems) =>
          prevItems.map((item) =>
            item.id === editedItem.id ? { ...item, observation: editedItem.observation } : item
          )
        );
        setIsEditing(false); // Fecha o formulário de edição
      }
    } catch (error) {
      console.error("Erro ao salvar item:", error);
    }
  };  

  return (
    <ul className="space-y-4">
      {items.map((item) => {
        return (
          <li
            key={item.id}
            className={`p-4 border rounded-lg shadow-sm bg-white transition duration-300 ease-in-out transform hover:scale-105 ${
              item.checked ? 'bg-green-100' : 'bg-gray-100'
            }`}
          >
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-4 w-5 h-5 text-blue-500 rounded focus:ring-blue-300"
                checked={item.checked}
                onChange={() => onCheckboxChange(item.id, !item.checked)}
              />
              <div className="flex flex-col">
                <span
                  className={`font-medium ${item.checked ? 'line-through text-gray-500' : ''}`}
                >
                  {item.quantity}x {item.name}
                </span>
                {item.observation && (
                  <span className="text-sm text-gray-600">{item.observation}</span>
                )}
              </div>
              <button
                className="ml-4 text-blue-500 hover:text-blue-700"
                onClick={() => handleEditItem(item)}
              >
                Editar
              </button>
            </label>

            {/* Formulário de edição */}
            {isEditing && editedItem.id === item.id && (
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
                  type="number"
                  className="w-full p-2 border rounded mb-2"
                  value={editedItem.quantity}
                  onChange={(e) =>
                    setEditedItem({ ...editedItem, quantity: e.target.value })
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
                <button
                  className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition duration-200"
                  onClick={handleSaveItem}
                >
                  Salvar
                </button>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export default ListItem;
