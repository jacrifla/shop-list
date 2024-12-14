import { BASE_URL } from "../utils/base";

const API_BASE_URL = `${BASE_URL}/item-list`

export async function createItemList(itemData) {
    try {
        const response = await fetch(`${API_BASE_URL}/create`, {
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

export async function toggleCheck(itemId, newCheStatus) {
    try {
        const response = await fetch(`${API_BASE_URL}/toggle-check`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ itemId, checked: newCheStatus }),
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
      const response = await fetch(`${API_BASE_URL}/items/${listId}`);
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
  