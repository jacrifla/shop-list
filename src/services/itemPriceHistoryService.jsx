import { toast } from 'react-toastify';
import { BASE_URL } from '../utils/base';
const API_URL = `${BASE_URL}/item-history`;

export const createItemPriceHistory = async (
  itemId,
  price,
  quantity,
  unit,
  barcode
) => {
  try {
    const requestData = { itemId, price, quantity, unit, barcode };
    console.log('Dados da requisição:', requestData); // Log dos dados que estão sendo enviados

    const response = await fetch(`${API_URL}/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    });

    const data = await response.json();

    console.log('Resposta da API:', data); // Log da resposta da API

    if (data.success) {
      toast.success('Histórico de preços criado com sucesso!');
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.error('Erro ao criar histórico de preços: ' + error.message);
    toast.error('Erro ao criar histórico de preços: ' + error.message);
  }
};

export const findAllItemPriceHistory = async () => {
  try {
    const response = await fetch(`${API_URL}/all`);
    const data = await response.json();

    if (data.success) {
      return data.data; // Retorna os históricos de preços
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error('Erro ao buscar históricos de preços: ' + error.message);
  }
};

export const findItemPriceHistoryByItemId = async (itemId) => {
  try {
    const response = await fetch(`${API_URL}/${itemId}`);
    const data = await response.json();

    if (data.success) {
      return data.data; // Retorna o histórico de preços do item
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error('Erro ao buscar histórico de preço do item: ' + error.message);
  }
};

export const updateItemPriceHistory = async (id, price, quantity, unit) => {
  try {
    const response = await fetch(`${API_URL}/update/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ price, quantity, unit }),
    });

    const data = await response.json();

    if (data.success) {
      toast.success('Histórico de preços atualizado com sucesso!');
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error('Erro ao atualizar histórico de preços: ' + error.message);
  }
};

export const deleteItemPriceHistory = async (id) => {
  try {
    const response = await fetch(`${API_URL}/delete/${id}`, {
      method: 'DELETE',
    });

    const data = await response.json();

    if (data.success) {
      toast.success('Histórico de preços deletado com sucesso!');
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error('Erro ao deletar histórico de preços: ' + error.message);
  }
};

export const getItemPricesWithNames = async () => {
    try {
        const response = await fetch(`${API_URL}/`);

        if (!response.ok) {
            throw new Error('Falha ao obter dados');
        };
        
        const data = await response.json();
        
        if (data.success) {
            return data.data;
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        console.error('Erro ao fazer a requisição:', error.message);
        return []; 
    }
}