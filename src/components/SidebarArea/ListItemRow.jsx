import React, { useState } from 'react';
import ItemPriceHistory from './ItemPriceHistory';
import EditItemForm from './EditItemForm';
import { createItemPriceHistory } from '../../services/itemPriceHistoryService';

function ListItemRow({ item, onCheckboxChange, setItems, categories }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingPriceHistory, setIsAddingPriceHistory] = useState(false);

  const handleEditItem = () => {
    setIsEditing(true);
  };

  const handleSaveItem = (updatedItem) => {
    if (!updatedItem || !updatedItem.id) {
      console.error('Item atualizado inválido:', updatedItem);
      return;
    }

    setItems((prevItems) =>
      prevItems.map((i) => (i.id === updatedItem.id ? updatedItem : i))
    );
    setIsEditing(false);
  };

  const handleAddPriceHistory = async (itemId, priceHistoryData) => {
    if (
      !priceHistoryData.price ||
      !priceHistoryData.quantity ||
      !priceHistoryData.barcode
    ) {
      console.error(
        'Erro: Todos os campos de preço, quantidade e código de barras são obrigatórios.'
      );
      return;
    }

    try {
      await createItemPriceHistory(
        itemId,
        priceHistoryData.price,
        priceHistoryData.quantity,
        priceHistoryData.unit,
        priceHistoryData.barcode
      );
      // Se a criação do histórico for bem-sucedida, você pode realizar outra ação (como fechar o formulário ou mostrar uma mensagem de sucesso)
      setIsAddingPriceHistory(false);
    } catch (error) {
      console.error('Erro ao adicionar histórico de preços:', error);
    }
  };

  const handleCancelAddPriceHistory = () => {
    setIsAddingPriceHistory(false);
  };

  return (
    <li
      className={`p-6 border rounded-lg shadow-sm transition duration-300 ease-in-out transform hover:scale-105 ${
        item.checked ? 'bg-green-100' : 'bg-gray-100'
      } min-h-[80px]`}
    >
      {/* Se não estiver editando, exibe o item com o botão de editar */}
      {!isEditing ? (
        <>
          <label className="flex items-center">
            <input
              type="checkbox"
              className="mr-4 w-5 h-5 text-blue-500 rounded focus:ring-blue-300"
              checked={item.checked}
              onChange={() => onCheckboxChange(item.id, !item.checked)}
            />
            <div className="flex flex-col">
              <span
                className={`font-medium ${
                  item.checked ? 'line-through text-gray-500' : ''
                }`}
              >
                {item.name}
              </span>
              {item.observation && (
                <span className="text-sm text-gray-600">
                  {item.observation}
                </span>
              )}
            </div>
            <button
              className="ml-4 text-blue-500 hover:text-blue-700"
              onClick={handleEditItem}
            >
              <i className="fas fa-edit"></i>
            </button>
          </label>
        </>
      ) : (
        <EditItemForm
          item={item}
          categories={categories}
          onCancel={() => setIsEditing(false)}
          onSave={handleSaveItem}
        />
      )}

      {/* Se estiver adicionando histórico de preço, mostra o formulário */}
      {isAddingPriceHistory && (
        <ItemPriceHistory
          itemId={item.id}
          onAddPriceHistory={handleAddPriceHistory}
          onCancel={handleCancelAddPriceHistory}
        />
      )}

      {/* Botão "Adicionar Histórico de Preço" centralizado abaixo do item */}
      {!isAddingPriceHistory && !isEditing && (
        <div className="flex justify-center mt-4">
          {' '}
          {/* Centraliza o botão */}
          <button
            className="bg-blue-500 text-white hover:text-green-700 p-2 rounded"
            onClick={() => setIsAddingPriceHistory(true)}
          >
            Adicionar Preço
          </button>
        </div>
      )}
    </li>
  );
}

export default ListItemRow;
