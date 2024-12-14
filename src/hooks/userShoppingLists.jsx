import { useState, useEffect } from 'react';
import { getListByUserId, getListWithPermission } from '../services/shoppingListService';

const useShoppingLists = (userId) => {
  const [lists, setLists] = useState([]);
  const [hasFetched, setHasFetched] = useState(false); // Flag para controlar a execução do efeito

  useEffect(() => {
    async function fetchShoppingLists() {
      if (userId && !hasFetched) {
        setHasFetched(true); // Marca que as listas foram buscadas
  
        try {
          // Buscar as listas criadas pelo usuário
          const createdListsResponse = await getListByUserId(userId);
          // Buscar as listas compartilhadas com o usuário
          const sharedListsResponse = await getListWithPermission(userId);
  
          console.log('Created Lists:', createdListsResponse.data);
          console.log('Shared Lists:', sharedListsResponse.data);
  
          // Combinar as duas listas, sem duplicação
          const combinedLists = [
            ...createdListsResponse.data,
            ...sharedListsResponse.data.filter(
              (sharedList) =>
                !createdListsResponse.data.some(
                  (createdList) => createdList.id === sharedList.id
                )
            ),
          ];
  
          console.log('Combined Lists:', combinedLists);
          setLists(combinedLists);
        } catch (error) {
          console.error('Erro ao buscar listas de compras:', error);
          setLists([]);
        }
      }
    }
  
    fetchShoppingLists();
  }, [userId, hasFetched]); // A dependência de 'hasFetched' impede múltiplas execuções
  

  const addList = (newList) => {
    setLists((prevLists) => {
      return [...prevLists, newList]; // Adiciona a nova lista sem sobrescrever
    });
  };

  return { lists, addList };
};

export default useShoppingLists;
