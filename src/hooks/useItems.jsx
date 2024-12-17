import { useState, useEffect } from 'react';
import { getItemsByList } from '../services/itemListService';

const useItems = (selectedListId) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchItems() {
      if (selectedListId) {
        try {
          const response = await getItemsByList(selectedListId);
          setItems(response || []);
        } catch (error) {
          console.error('Erro ao buscar itens:', error);
          setItems([]);
        }
      }
    }

    fetchItems();
  }, [selectedListId]);

  return { items, setItems }; // Retorna os itens e a função para atualizá-los
};

export default useItems;
