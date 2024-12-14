import { createShareToken, approveShareToken } from './shareListPermissionService';
import { addPermission } from './shareListPermissionService';

// Gera um token para compartilhar uma lista com outro usuário.
export async function shareListWithUser(listId, recipientUserId) {
  try {
    const token = await createShareToken(listId, recipientUserId);
    return token;
  } catch (error) {
    console.error('Erro ao compartilhar a lista:', error);
    throw error;
  }
}

// Aprova um token e adiciona permissão ao usuário.
export async function approveTokenAndGrantPermission(token) {
  try {
    // Aprova o token
    const approvalMessage = await approveShareToken(token, true);

    // Detalhes do token (listId, userId)
    const { listId, userId } = token;

    // Adiciona permissão de edição
    await addPermission(listId, userId);

    return approvalMessage;
  } catch (error) {
    console.error('Erro ao aprovar token e conceder permissão:', error);
    throw error;
  }
}

// Rejeita um token (apenas rejeição sem permissões).
export async function rejectShareToken(token) {
  try {
    const rejectionMessage = await approveShareToken(token, false);
    return rejectionMessage;
  } catch (error) {
    console.error('Erro ao rejeitar token:', error);
    throw error;
  }
}
