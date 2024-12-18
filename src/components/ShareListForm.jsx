import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAllUsers } from '../services/userService';

function ShareListForm({ onShare }) {
  const [users, setUsers] = useState([]); // Estado para armazenar os usuários
  const [selectedEmail, setSelectedEmail] = useState(''); // Estado para armazenar o e-mail selecionado

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const usersData = await getAllUsers(); // Busca os usuários da API
        console.log(usersData); // Verifique o que está sendo retornado
        setUsers(usersData.data || []); // Acesse a propriedade "data" que contém o array de usuários
      } catch (error) {
        toast.error(`Erro ao carregar usuários: ${error.message}`);
      }
    };
  
    loadUsers(); // Carrega os usuários ao montar o componente
  }, []);  
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (selectedEmail) {
      try {
        await onShare(selectedEmail); // Chama a função onShare passada por List
        toast.success('Lista compartilhada com sucesso!');
      } catch (error) {
        toast.error(`Erro ao compartilhar: ${error.message}`);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <select
        value={selectedEmail}
        onChange={(e) => setSelectedEmail(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-4"
        required
      >
        <option value="">Selecione um usuário</option>
        {users.map((user) => (
          <option key={user.id} value={user.email}>
            {user.email}
          </option>
        ))}
      </select>

      <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
        Compartilhar
      </button>
    </form>
  );
}
export default ShareListForm;