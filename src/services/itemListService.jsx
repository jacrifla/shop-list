import { BASE_URL } from '../utils/base';

const API_URL = `${BASE_URL}/item-list`;

export async function createItemList(itemData) {
  try {
    const response = await fetch(`${API_URL}/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(itemData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Erro no servidor:', errorData);
      throw new Error(
        `Erro ao adicionar item: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    console.log('Item criado com sucesso: ', data);
    return data;
  } catch (error) {
    console.error('Erro na criação do item:', error.message);
    throw error;
  }
}

export async function fetchItems() {
  try {
    const response = await fetch(`${API_URL}/all`);
    if (!response.ok) {
      throw new Error('Erro ao buscar todos os itens');
    }
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getItemsByList(listId) {
  try {
    const response = await fetch(`${API_URL}/all-by-list/${listId}`);

    if (!response.ok) {
      throw new Error('Erro ao buscar os itens da lista');
    }
    const data = await response.json();

    return data.data || [];
  } catch (error) {
    console.error(error);
    return []; // Retorna um array vazio em caso de erro
  }
}

// Função para alternar o status de "checado" do item
export async function toggleCheck(itemId) {
  try {
    const response = await fetch(`${API_URL}/toggle-check`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ itemId }),
    });

    if (!response.ok) {
      throw new Error('Erro ao atualizar o status do item');
    }

    const data = await response.json();
    console.log('Status do item alterado com sucesso:', data);
    return data;
  } catch (error) {
    console.error('Erro:', error);
    throw error;
  }
}

// Função para atualizar um item
export async function updateItem(itemId, updates) {
  try {
    const response = await fetch(`${API_URL}/update/${itemId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Erro no servidor:', errorData);
      throw new Error(
        `Erro ao atualizar item: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    console.log('Item atualizado com sucesso: ', data);
    return data;
  } catch (error) {
    console.error('Erro na atualização do item:', error.message);
    throw error;
  }
}

// Função para excluir um item da lista
export async function deleteItem(itemId) {
  try {
    const response = await fetch(`${API_URL}/delete/${itemId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Erro no servidor:', errorData);
      throw new Error(
        `Erro ao excluir item: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    console.log('Item excluído com sucesso:', data);
    return data;
  } catch (error) {
    console.error('Erro na exclusão do item:', error.message);
    throw error;
  }
}
