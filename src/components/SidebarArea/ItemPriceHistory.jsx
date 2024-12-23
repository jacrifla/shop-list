import React, { useState, useEffect } from 'react';

function ItemPriceHistory({ itemId, priceHistoryToEdit, onAddPriceHistory, onEditPriceHistory, onCancel }) {
  const [priceHistory, setPriceHistory] = useState({
    price: '',
    quantity: '',
    unit: 'UN',
    barcode: ''
  });

  // Atualiza os campos com dados caso seja um histórico para edição
  useEffect(() => {
    if (priceHistoryToEdit) {
      setPriceHistory({
        price: priceHistoryToEdit.price,
        quantity: priceHistoryToEdit.quantity,
        unit: priceHistoryToEdit.unit,
        barcode: priceHistoryToEdit.barcode
      });
    }
  }, [priceHistoryToEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPriceHistory({
      ...priceHistory,
      [name]: value,
    });
  };

  const handleSave = () => {
    if (!priceHistory.price || !priceHistory.quantity) {
      alert("Todos os campos são obrigatórios!");
      return;
    }
    
    if (priceHistoryToEdit) {
      // Se estamos editando, chama a função de editar
      onEditPriceHistory(itemId, priceHistoryToEdit.id, priceHistory);
    } else {
      // Caso contrário, chama a função para adicionar o histórico de preço
      onAddPriceHistory(itemId, priceHistory);
    }

    // Limpa os campos após salvar
    setPriceHistory({
      price: '',
      quantity: '',
      unit: 'UN',
      barcode: ''
    });
  };

  return (
    <div className="mb-4">
      <h3 className="text-lg font-semibold mb-2">{priceHistoryToEdit ? 'Editar Histórico de Preço' : 'Adicionar Histórico de Preço'}</h3>
      <div className="flex flex-col space-y-2">
        <input
          type="number"
          name="price"
          value={priceHistory.price}
          onChange={handleInputChange}
          className="p-2 border rounded"
          placeholder="Preço"
        />
        <input
          type="number"
          name="quantity"
          value={priceHistory.quantity}
          onChange={handleInputChange}
          className="p-2 border rounded"
          placeholder="Quantidade"
        />
        <input
          type="text"
          name="barcode"
          value={priceHistory.barcode}
          onChange={handleInputChange}
          className="p-2 border rounded"
          placeholder="Código de Barras"
        />
        <select
          name="unit"
          value={priceHistory.unit}
          onChange={handleInputChange}
          className="p-2 border rounded"
        >
          <option value="UN">UN</option>
          <option value="KG">KG</option>
          <option value="L">L</option>
        </select>
        <div className="flex gap-1">
          <button
            className="bg-blue-500 text-white py-2 flex-grow rounded hover:bg-blue-600 transition duration-200 flex items-center justify-center text-lg"
            onClick={handleSave}
          >
            <i className="fas fa-plus" />
          </button>
          <button
            className="bg-gray-500 text-white py-2 flex-grow rounded hover:bg-gray-600 transition duration-200 flex items-center justify-center text-lg"
            onClick={onCancel}
          >
            <i className="fas fa-times" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemPriceHistory;
