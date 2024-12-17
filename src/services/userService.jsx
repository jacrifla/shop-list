import { BASE_URL } from "../utils/base";

const API_BASE_URL = `${BASE_URL}/users`;

export const getAllUsers = async () => {
  try {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) {
      throw new Error('Erro ao buscar usuários');
    }
    return await response.json();
  } catch (error) {
    console.error('Erro:', error);
    throw error;
  }
};

export const getUserByEmail = async (email) => {  
  try {
    const response = await fetch(`${API_BASE_URL}/email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }), 
    });

    if (!response.ok) {
      throw new Error('Erro ao buscar usuário por email');
    }   

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUserById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    if (!response.ok) {
      throw new Error('Erro ao buscar usuário por ID');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const login = async (email, password) => {
  try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
      });
      
      if (!response.ok) {
          throw new Error('Falha na autenticação');
      }
      
      return await response.json();
  } catch (error) {
      throw error;
      
  }
}

export const createUser = async (name, email, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name, email, password}),
    });
    if (!response.ok) {
      throw new Error('Erro ao criar usuário');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateUser = async (name, email, id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/update/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email }),
    });
    if (!response.ok) {
      throw new Error('Erro ao atualizar dados do usuário');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const deleteUser = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/delete/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Erro ao deletar usuário');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const restoreUser = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/restore/${id}`, {
      method: 'POST',
    });
    if (!response.ok) {
      throw new Error('Erro ao restaurar usuário');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const resetPassword = async (email, newPassword) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, newPassword }),
    });
    if (!response.ok) {
      throw new Error('Erro ao resetar senha');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}