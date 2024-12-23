import React, { useState } from 'react';
import { createItemList, toggleCheck } from '../../services/itemListService';
import ListItem from './ListItem';
import AddItemForm from './AddItemForm';
import { toast } from 'react-toastify';
import { formatTitleCase } from '../../utils/function';

function Sidebar({ selectedListId, items, setItems, toggleSidebar }) {
  const [newItem, setNewItem] = useState({
    name: '',
    observation: '',
    category_id: '',
  });
  const [isAddingItem, setIsAddingItem] = useState(false);

  async function handleAddItem(category_id) {
    if (!newItem.name.trim()) {
      toast.error('O nome do item é obrigatório.');
      return;
    }
    if (!selectedListId) {
      toast.error('Selecione uma lista antes de adicionar itens.');
      return;
    }

    try {
      const itemData = {
        listId: selectedListId,
        name: formatTitleCase(newItem.name.trim()),
        observation: newItem.observation.trim(),
        category_id,
      };
      const response = await createItemList(itemData);
      if (response && response.data) {
        setItems((prevItems) => [...prevItems, response.data]);
        setNewItem({ name: '', observation: '', category_id: '' });
        setIsAddingItem(false);
        toast.success('Item adicionado com sucesso!');
      }
    } catch (error) {
      toast.error('Erro ao adicionar o item. Tente novamente.');
    }
  }

  const handleCheckboxChange = async (itemId, newCheckedStatus) => {
    try {
      await toggleCheck(itemId, newCheckedStatus);
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === itemId ? { ...item, checked: newCheckedStatus } : item
        )
      );
    } catch (error) {
      toast.error('Erro ao atualizar o status do item.');
    }
  };

  return (
    <aside className="w-80 bg-gray-200 p-6 shadow-lg rounded-lg flex flex-col min-h-screen">
      <button
        className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition duration-200 mb-4"
        onClick={toggleSidebar}
      >
        Fechar
      </button>

      <button
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200 mb-4"
        onClick={() => setIsAddingItem((prev) => !prev)}
      >
        {isAddingItem ? 'Cancelar' : 'Adicionar Item'}
      </button>

      {isAddingItem && (
        <AddItemForm
          newItem={newItem}
          setNewItem={setNewItem}
          handleAddItem={handleAddItem}
        />
      )}

      {selectedListId && (
        <div className="overflow-y-auto max-h-[calc(100vh-220px)] pr-2 flex-1">
          <h3 className="font-semibold text-xl text-gray-700">Itens</h3>
          <ListItem
            items={items}
            onCheckboxChange={handleCheckboxChange}
            setItems={setItems}
          />
        </div>
      )}
    </aside>
  );
}

export default Sidebar;
