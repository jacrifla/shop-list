import { createShoppingList, getListByUserId } from './shoppingListService';
import { createShareToken, approveShareToken, getTokensListId} from './shareListPermissionService';
import { addPermission } from './shareListPermissionService';

// Cria uma lista de compras e gera um token de compartilhamento para outro usuário.
export async function createListAndShare(listData, userId, shareWithUserId) {
  try {
    // Cria a lista de compras
    const createdList = await createShoppingList(listData);

    if (!createdList || !createdList.id) {
      throw new Error('Falha ao criar a lista de compras.');
    }

    // Gera um token de compartilhamento para o usuário especificado
    const shareToken = await createShareToken(createdList.id, shareWithUserId);

    return { createdList, shareToken };
  } catch (error) {
    console.error('Erro ao criar lista e gerar token de compartilhamento:', error);
    throw error;
  }
}

// Processa a aprovação de um token e adiciona permissões à lista correspondente.
export async function processTokenApproval(token, approved) {
  try {
    // Aprova ou rejeita o token
    const approvalMessage = await approveShareToken(token, approved);

    if (approved) {
      // Adiciona permissões caso o token seja aprovado
      const tokenDetails = await getTokensListId(token.listId); // Pega os detalhes do token
      await addPermission(tokenDetails.listId, tokenDetails.userId);
    }

    return approvalMessage;
  } catch (error) {
    console.error('Erro ao processar aprovação do token:', error);
    throw error;
  }
}

// Obtém listas de compras e tokens associados para um usuário.
export async function getUserListsWithTokens(userId) {
  try {
    // Busca as listas do usuário
    const lists = await getListByUserId(userId);

    if (!lists || lists.length === 0) {
      return [];
    }

    // Busca tokens para cada lista
    const listsWithTokens = await Promise.all(
      lists.map(async (list) => {
        const tokens = await getTokensListId(list.id);
        return { ...list, tokens };
      })
    );

    return listsWithTokens;
  } catch (error) {
    console.error('Erro ao buscar listas e tokens:', error);
    throw error;
  }
}
