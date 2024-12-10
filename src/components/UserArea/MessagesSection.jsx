import React from 'react';

function MessagesSection() {
  return (
    <div className="flex-1 ml-4">
      <h3 className="text-2xl font-semibold mb-4">Mensagens</h3>
      <div className="bg-gray-50 p-4 border border-gray-200 rounded shadow-sm">
        <p className="text-gray-600">Avisos de compartilhamento de listas aparecerão aqui.</p>
      </div>
    </div>
  );
}

export default MessagesSection;
