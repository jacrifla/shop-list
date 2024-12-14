import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ShareListForm({ onShare }) {
  const [email, setEmail] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (email) {
      try {
        await onShare(email); // Chama a função onShare passada por List
        toast.success('Lista compartilhada com sucesso!');
      } catch (error) {
        toast.error(`Erro ao compartilhar: ${error.message}`);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Digite o email do usuário"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-4"
        required
      />
      <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
        Compartilhar
      </button>
    </form>
  );
}
export default ShareListForm;