import React, { useEffect, useState } from 'react';
import { getUserById, updateUser } from '../../services/userService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function UserInfoSection({ userId, isAuthenticated }) {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({ name: '', email: '' });

  useEffect(() => {
    if (isAuthenticated && userId) {
      const fetchUserData = async () => {
        try {
          const userData = await getUserById(userId);

          if (userData && userData.data) {

            setUserInfo({
              name: userData.data.name,
              email: userData.data.email,
            });
          } else {
            console.error('Nenhum dado de usuário encontrado.');
          }
        } catch (error) {
          console.error('Erro ao carregar informações do usuário:', error);
        }
      };

      fetchUserData();
    } else {
      navigate('/');
    }
  }, [isAuthenticated, userId, navigate]);

  const handleSaveChanges = async () => {
    try {
      // Verificar se o nome ou email foi alterado. Se não, passa o valor atual.
      const updatedUser = await updateUser(
        userInfo.name,
        userInfo.email,
        userId
      );
      if (updatedUser) {
        toast.success('Atualizado com sucesso!');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangePassword = () => {
    navigate('/password-recovery');
  };

  return (
    <div className="flex-1 mb-4 md:mb-0">
      <h3 className="text-2xl font-semibold mb-4">Informações do Usuário</h3>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Nome</label>
        <input
          type="text"
          value={userInfo.name}
          onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Email</label>
        <input
          type="email"
          value={userInfo.email}
          onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Botões de salvar alterações e alterar senha */}
      <button
        className="w-full mt-4 bg-green-500 text-white py-2 rounded hover:bg-green-600 transition duration-300"
        onClick={handleSaveChanges}
      >
        Salvar Alterações
      </button>
      <button
        className="w-full mt-4 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300"
        onClick={handleChangePassword}
      >
        Alterar Senha
      </button>
    </div>
  );
}

export default UserInfoSection;
