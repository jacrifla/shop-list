import { BASE_URL } from "../utils/base";

const API_URL = `${BASE_URL}/category`;

export const createCategory = async (name, description) => {
  try {
    const response = await fetch(`${API_URL}/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, description }),
    });

    const data = await response.json();
    if (response.ok) {
      return { success: true, data };
    } else {
      return { success: false, message: data.message || 'Erro ao criar categoria' };
    }
  } catch (err) {
    return { success: false, message: 'Erro ao criar categoria' };
  }
};

export const fetchCategories = async () => {
  try {
    const response = await fetch(`${API_URL}/all`);
    const data = await response.json();
    if (response.ok) {
      return { success: true, data: data.data };
    } else {
      return { success: false, message: data.message || 'Erro ao buscar categorias' };
    }
  } catch (err) {
    return { success: false, message: 'Erro ao buscar categorias' };
  }
};

export const fetchCategoryById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    const data = await response.json();
    if (response.ok) {
      return { success: true, data: data.data };
    } else {
      return { success: false, message: data.message || 'Erro ao buscar categoria' };
    }
  } catch (err) {
    return { success: false, message: 'Erro ao buscar categoria' };
  }
};

export const deleteCategory = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });

    const data = await response.json();
    if (response.ok) {
      return { success: true, message: 'Categoria excluída com sucesso' };
    } else {
      return { success: false, message: data.message || 'Erro ao excluir categoria' };
    }
  } catch (err) {
    return { success: false, message: 'Erro ao excluir categoria' };
  }
};
