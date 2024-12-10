import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { login } from '../services/userService';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [redirecting, setRedirecting] = useState(false);

  const navigate = useNavigate();
  const { login: authenticateUser } = useAuth();
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const response = await login( email, password );    
      
      if (response.success) {
        authenticateUser(response);
        setRedirecting(true);
        setTimeout(() => {
          navigate('/home');          
        }, 2000);
        setLoading(false);
      } else {
        throw new Error('Falha no login');
      }
    } catch (error) {
      setError('Falha na autenticação. Verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
  }

  if (redirecting) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl font-semibold">Carregando...</p>
      </div>
    );
  }
  
  return (
    <div className="p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      {error && (
        <div className='mb-4 text-rec-500 text-center'>
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu email"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Senha</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite sua senha"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600 transition duration-300"
          disabled={loading}
        >
          {loading ? 'Carregando...' : 'Login'}
        </button>
      </form>
      <div className="mt-4 text-center">
        <p className="text-gray-600">
          Não tem uma conta? <a href="/register" className="text-blue-500 hover:underline">Cadastre-se aqui</a>
        </p>
        <p className="text-gray-600 mt-2">
          Esqueceu sua senha? <a href="/password-recovery" className="text-blue-500 hover:underline">Recupere sua senha</a>
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
