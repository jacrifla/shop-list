import { BASE_URL } from "../utils/base";
import { getUserByEmail} from '../services/userService'
import { addPermission } from "./shareListPermissionService";

const API_URL = `${BASE_URL}/share-tokens/tokens`;

// Função para criar um token de compartilhamento
export const createShareToken = async (listId, userId) => {
  try {
    const response = await fetch(`${API_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ listId, userId }),
    });    

    // Se a resposta não for OK, trate o erro
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erro desconhecido ao criar token');
    }

    const data = await response.json();

    // Se o backend enviar uma resposta de erro
    if (!data.success) {
      throw new Error(data.message || 'Erro ao criar token');
    }

    return data.data; // Retorna o token criado
  } catch (error) {
    console.error('Erro ao criar token:', error);
    throw new Error(error.message || 'Falha ao criar token de compartilhamento');
  }
};

// Função centralizada para aprovar ou rejeitar um token
const approveToken = async (token, approved) => {
  
  try {
    const response = await fetch(`${API_URL}/approve`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, approved }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erro desconhecido ao aprovar/rejeitar token');
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message || 'Erro ao aprovar/rejeitar token');
    }

    return data; // Retorna os dados da aprovação do token
  } catch (error) {
    console.error('Erro ao aprovar/rejeitar token:', error);
    throw new Error(error.message || 'Falha ao aprovar ou rejeitar o token');
  }
};

// Função para obter tokens por listId
export const getTokensListId = async (listId) => {
  try {
    const response = await fetch(`${API_URL}/${listId}`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erro desconhecido ao obter tokens');
    }

    const data = await response.json();

    if (data.success) {
      return data.data;
    } else {
      throw new Error(data.message || 'Erro desconhecido');
    }
  } catch (error) {
    console.error('Erro ao obter tokens:', error);
    throw error;
  }
};

export const createShareTokenWithUser = async (listId, email) => {
  try {
    // Chama a função getUserByEmail para buscar o userId
    const userData = await getUserByEmail(email);

    // Verifica se o usuário foi encontrado
    if (!userData.success) {
      throw new Error('Usuário não encontrado');
    }

    const userId = userData.data.id;

    // Agora chama a função createShareToken passando o userId e listId
    const token = await createShareToken(listId, userId);

    return token;  } catch (error) {
    console.error('Erro ao criar token de compartilhamento com usuário:', error);
    throw new Error(error.message || 'Falha ao criar token de compartilhamento com usuário');
  }
};

// Função para aprovar ou rejeitar um token (sem lógica adicional)
export const approveShareToken = async (token, approved) => {
  const data = await approveToken(token, approved);
  return data.message; // Retorna a mensagem de sucesso ou erro
};

// Função para aprovar ou rejeitar um token e adicionar a permissão se aprovado
export const handleShareTokenApproval = async (token, approved, listId, userId) => {
  const numericUserId = Number(userId);

  const data = await approveToken(token, approved);

  // Se aprovado, chama addPermission
  if (approved) {
    const permissionData = await addPermission(listId, numericUserId);
    return permissionData;
  }

  return data.message;
};

// Função para obter tokens por userId e listId
export const getTokensByUserIdAndListId = async (userId, listId) => {
  try {
    const response = await fetch(`${API_URL}/tokens/${userId}/${listId}`, {
      method: 'GET',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erro desconhecido ao obter tokens');
    }

    const data = await response.json();

    if (data.success) {
      return data.data; // Retorna os tokens obtidos
    } else {
      throw new Error(data.message || 'Erro desconhecido');
    }
  } catch (error) {
    console.error('Erro ao obter tokens:', error);
    throw error;
  }
};
