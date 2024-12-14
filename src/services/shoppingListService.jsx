import { BASE_URL } from "../utils/base";

const API_URL = `${BASE_URL}/shopping-list`;

export async function createShoppingList(listData) {
  try {
    const response = await fetch(`${API_URL}/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(listData),
    });
    if (!response.ok) {
      throw new Error("Erro ao criar a lista de compras");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro:", error);
  }
}

export async function getListByUserId(userId) {
  try {
    const response = await fetch(`${API_URL}/list-user/${userId}`);
    if (!response.ok) {
      throw new Error("Erro ao buscar as listas de compras");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro:", error);
  }
}

// Função para obter listas criadas ou compartilhadas com o usuário
export const getListWithPermission = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/list-permission/${userId}`);
    if (!response.ok) {
      throw new Error('Erro ao buscar listas com permissão');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar listas com permissão:', error);
    throw error;
  }
};

export const deleteShoppingList = async (id) => {  
  try {
    const response = await fetch(`${API_URL}/delete/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Erro ao excluir a lista de compras');
    }
    
    return true;
  } catch (error) {
    console.error('Erro ao excluir a lista de compras:', error);
    throw error;
  }
}