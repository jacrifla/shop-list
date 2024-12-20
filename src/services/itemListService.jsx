import { BASE_URL } from "../utils/base";

const API_URL = `${BASE_URL}/item-list`

export async function createItemList(itemData) {
    try {
        const response = await fetch(`${API_URL}/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(itemData),
        });

        // Verifica se a resposta HTTP indica sucesso
        if (!response.ok) {
            const errorData = await response.json();
            console.error('Erro no servidor:', errorData);
            throw new Error(`Erro ao adicionar item: ${response.status} ${response.statusText}`);
        }

        // Processa a resposta caso o status HTTP esteja OK
        const data = await response.json();
        console.log('itemListService: ', data);
        return data;
    } catch (error) {
        console.error('Erro na criação do item:', error.message);
        throw error;
    }
}

export async function toggleCheck(itemId, newCheckedStatus) {
    try {
        const response = await fetch(`${API_URL}/toggle-check`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ itemId, checked: newCheckedStatus }),
        })

        if (!response.ok) {
            throw new Error('Erro ao atualizar o status do item')
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro:', error);
        throw error;
    }
}

export async function getItemsByList(listId) {
    try {
      const response = await fetch(`${API_URL}/items/${listId}`);
      if (!response.ok) {
        throw new Error('Erro ao buscar os itens da lista');
      }
      const data = await response.json();
      
      return data.data || []; // Retorna apenas a propriedade `data` que contém os itens
    } catch (error) {
      console.error('Erro:', error);
      return []; // Retorna um array vazio em caso de erro
    }
}

export async function updateItem(itemId, updates) {
    try {
        const response = await fetch(`${API_URL}/update/${itemId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updates),
        });

        // Verifica se a resposta HTTP indica sucesso
        if (!response.ok) {
            const errorData = await response.json();
            console.error('Erro no servidor:', errorData);
            throw new Error(`Erro ao atualizar item: ${response.status} ${response.statusText}`);
        }

        // Processa a resposta caso o status HTTP esteja OK
        const data = await response.json();
        console.log('Item atualizado com sucesso: ', data);
        return data;
    } catch (error) {
        console.error('Erro na atualização do item:', error.message);
        throw error;
    }
}

export const deleteListWithItems  = async (listId) => {
    try {
      const response = await fetch(`${API_URL}/delete-with-items/${listId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Erro ao deletar lista e itens');
      }
      const data = await response.json();
      console.log('ItemListService: ', data);
      console.log(data.message);
      return true;
    } catch (error) {
      console.error('Erro ao excluir a lista e os itens:', error);
      throw error;
    }
  };
  