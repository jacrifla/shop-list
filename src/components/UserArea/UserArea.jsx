import React from 'react';
import UserInfoSection from './UserInfoSection';
import MessagesSection from './MessagesSection';
import DangerZone from './DangerZone';
import { useAuth } from '../../context/AuthContext';

function UserArea() {
  const { userId, isAuthenticated } = useAuth();

  return (
    <div className="w-full max-w-6xl bg-white p-8 rounded-lg shadow-md">
      <div className="flex flex-col md:flex-row justify-between mb-6">
        {/* Informações do usuário */}
        <UserInfoSection userId={userId} isAuthenticated={isAuthenticated}/>

        {/* Área de mensagens */}
        <MessagesSection />
      </div>

      {/* Danger Zone */}
      <DangerZone userId={userId}/>
    </div>
  );
}

export default UserArea;
