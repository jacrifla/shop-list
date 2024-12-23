import { toast } from "react-toastify";
import { BASE_URL } from '../utils/base';
const API_URL = `${BASE_URL}/item-history`;

export const createItemPriceHistory = async (itemId, price, quantity, unit, barcode) => {
    try {
        const response = await fetch(`${API_URL}/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ itemId, price, quantity, unit, barcode }),
        });

        const data = await response.json();

        if (data.success) {
            toast.success("Histórico de preços criado com sucesso!");
        } else {
            toast.error(data.message);
        }
    } catch (error) {
        toast.error("Erro ao criar histórico de preços: " + error.message);
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
        toast.error("Erro ao buscar históricos de preços: " + error.message);
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
        toast.error("Erro ao buscar histórico de preço do item: " + error.message);
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
            toast.success("Histórico de preços atualizado com sucesso!");
        } else {
            toast.error(data.message);
        }
    } catch (error) {
        toast.error("Erro ao atualizar histórico de preços: " + error.message);
    }
};

export const deleteItemPriceHistory = async (id) => {
    try {
        const response = await fetch(`${API_URL}/delete/${id}`, {
            method: 'DELETE',
        });

        const data = await response.json();

        if (data.success) {
            toast.success("Histórico de preços deletado com sucesso!");
        } else {
            toast.error(data.message);
        }
    } catch (error) {
        toast.error("Erro ao deletar histórico de preços: " + error.message);
    }
};
