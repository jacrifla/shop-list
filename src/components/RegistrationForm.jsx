import React, { useState } from "react";
import { createUser } from "../services/userService";
import { useNavigate } from "react-router-dom";

function RegistrationForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }
    
    setLoading(true);

    try {
      const response = await createUser(name, email, password);
      if (response.success) {
        navigate('/');
      }
      setSuccess('Usuário criado com sucesso!');
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');

    } catch (error) {
      setError(error.message);      
    } finally {
      setLoading(false);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="bg-white p-6 rounded shadow-md w-full max-w-lg mx-auto"
    >
      {error && (
        <div className="mb-4 text-red-500 text-center">
          {error}
        </div>
      )}
      {success && (
        <div className="mb-4 text-green-500 text-center">
          {success}
        </div>
      )}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Nome"
          value={name || ''} // Garante que o valor nunca será undefined
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <input
          type="email"
          placeholder="Email"
          value={email || ''} // Garante que o valor nunca será undefined
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <input
          type="password"
          placeholder="Senha"
          value={password || ''} // Garante que o valor nunca será undefined
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <input
          type="password"
          placeholder="Confirmar Senha"
          value={confirmPassword || ''} // Garante que o valor nunca será undefined
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
        disabled={loading}
      >
        {loading ? 'Carregando...' : 'Cadastrar'}
      </button>
      <div className="mt-4 text-center">
        <p className="text-gray-600">
          Já tem uma conta? <a href="/" className="text-blue-500 hover:underline">Faça login aqui</a>
        </p>
      </div>
    </form>
  );
}

export default RegistrationForm;
