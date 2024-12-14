import React, { useEffect, useState } from 'react';
import UserInfoSection from './UserInfoSection';
import MessagesSection from './MessagesSection';
import DangerZone from './DangerZone';
import { useAuth } from '../../context/AuthContext';
import { getTokensListId, handleShareTokenApproval } from '../../services/shareTokenService';
import { ToastContainer, toast } from 'react-toastify';

function UserArea() {
  const [tokens, setTokens] = useState([]);
  const { userId, isAuthenticated } = useAuth();
  const [listId, setListId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Função para carregar os tokens
  useEffect(() => {
    async function fetchTokens() {
      try {
        const fetchedTokens = await getTokensListId(userId);
        setTokens(fetchedTokens);
        // Defina o listId do primeiro token carregado (se existir)
        if (fetchedTokens.length > 0) {
          setListId(fetchedTokens[0].list_id); // Salva o listId do primeiro token
        }
      } catch (error) {
        console.error('Erro ao carregar tokens:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchTokens();
  }, [userId]);

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
      setTokens((prevTokens) => prevTokens.filter((t) => t.token !== token.token));
    } catch (error) {
      toast.error(`Erro ao processar token: ${error.message}`);
    }
  };

  return (
    <div className="w-full max-w-6xl bg-white p-8 rounded-lg shadow-md">
      <div className="flex flex-col md:flex-row justify-between mb-6">
        {/* Informações do usuário */}
        <UserInfoSection userId={userId} isAuthenticated={isAuthenticated}/>

        {/* Área de mensagens */}
        <MessagesSection tokens={tokens} onApproval={handleApproval} isLoading={isLoading}/>
      </div>

      {/* Danger Zone */}
      <DangerZone userId={userId}/>

      {/* Toast container */}
      <ToastContainer />
    </div>
  );
}

export default UserArea;
