import React, { useState } from 'react';
import { getUserByEmail } from '../../services/userService';
import { createShareToken } from '../../services/shareTokenService';


const ShareList = ({ listId }) => {
  const [email, setEmail] = useState('');

  const handleShareList = async () => {
    try {
      const user = await getUserByEmail(email);

      if (!user || !user.data || !user.data.id) {
        console.error('Usuário não encontrado');
        return;
      }

      const userId = user.data.id;
      const token = await createShareToken(listId, userId);
      console.log('Token: ' + token);
      console.log(`Lista compartilhada com sucesso! Token: ${token}`);
    } catch (error) {
      console.error(`Erro ao compartilhar lista: ${error.message}`);
    }
  };

  return (
    <div>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Digite o email do usuário"
        className="border border-gray-300 p-2 rounded mr-2"
      />
      <button
        onClick={handleShareList}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Compartilhar Lista
      </button>
    </div>
  );
};

export default ShareList;
