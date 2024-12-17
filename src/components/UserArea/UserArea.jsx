import React, { useEffect, useState, useCallback } from 'react';
import UserInfoSection from './UserInfoSection';
import MessagesSection from './MessagesSection';
import DangerZone from './DangerZone';
import { useAuth } from '../../context/AuthContext';
import { getTokensListId, handleShareTokenApproval } from '../../services/shareTokenService';
import { ToastContainer, toast } from 'react-toastify';

function UserArea() {
  const [tokens, setTokens] = useState([]);
  const [selectedToken, setSelectedToken] = useState(null); // Estado para manter a seleção
  const { userId, isAuthenticated } = useAuth();
  const [listId, setListId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Função para carregar os tokens
  const fetchTokens = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const fetchedTokens = await getTokensListId(userId);
      if (fetchedTokens && fetchedTokens.length > 0) {
        setTokens(fetchedTokens);
        setListId(fetchedTokens[0].list_id);

        // Caso já tenha um token selecionado, garanta que ele não seja perdido
        if (selectedToken && fetchedTokens.some((token) => token.token === selectedToken.token)) {
          // Mantenha a seleção se o token ainda existir na nova lista
          setSelectedToken((prevToken) => prevToken);
        } else {
          setSelectedToken(null); // Se o token não estiver mais presente, remova a seleção
        }
      }
    } catch (error) {
      console.error('Erro ao carregar tokens:', error);
      setError('Erro ao carregar tokens. Tente novamente.');
      toast.error(`Erro ao carregar tokens: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  }, [userId, selectedToken]); // Dependência de selectedToken

  useEffect(() => {
    fetchTokens(); // Carrega os tokens assim que o componente for montado

    const interval = setInterval(() => {
      fetchTokens(); // Atualiza a lista de tokens a cada 5 segundos
    }, 5000);

    return () => clearInterval(interval);
  }, [fetchTokens]);

  // Função para aprovar ou rejeitar o compartilhamento
  const handleApproval = async (token, approved) => {
    try {
      if (!listId) {
        console.error('listId não encontrado');
        return;
      }

      const approvalResponse = await handleShareTokenApproval(token, approved, listId, userId);

      if (approved && approvalResponse) {
        toast.success('Permissão concedida!');
      }

      toast.success(approvalResponse || 'Token processado com sucesso!');

      // Filtra os tokens localmente após a aprovação/rejeição
      setTokens((prevTokens) => {
        const updatedTokens = prevTokens.filter((t) => t.token !== token.token);
        return updatedTokens;
      });
    } catch (error) {
      toast.error(`Erro ao processar token: ${error.message}`);
    }
  };

  // Função para lidar com a seleção do token
  const handleSelectToken = (event) => {
    const selected = tokens.find((token) => token.token === event.target.value);
    setSelectedToken(selected);
  };

  return (
    <div className="w-full max-w-6xl bg-white p-8 rounded-lg shadow-md">
      <div className="flex flex-col md:flex-row justify-between mb-6">
        {/* Informações do usuário */}
        <UserInfoSection userId={userId} isAuthenticated={isAuthenticated} />

        {/* Área de mensagens */}
        <MessagesSection
          tokens={tokens}
          onApproval={handleApproval}
          isLoading={isLoading}
          selectedToken={selectedToken} // Passando o token selecionado
          onSelectToken={handleSelectToken} // Passando a função para selecionar o token
        />
      </div>

      {/* Danger Zone */}
      <DangerZone userId={userId} />

      {/* Toast container */}
      <ToastContainer />

      {/* Exibição de erro, caso exista */}
      {error && <div className="error-message text-red-500">{error}</div>}
    </div>
  );
}

export default UserArea;
