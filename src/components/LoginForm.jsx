import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { login } from '../services/userService';
import { useNavigate } from 'react-router-dom';
import InputField from './InputField';
import SubmitButton from './SubmitButton';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { login: authenticateUser } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await login(email, password);

      if (response.success) {
        authenticateUser(response);
        setRedirecting(true);
        setTimeout(() => {
          navigate('/home');
        }, 2000);
      } else {
        throw new Error('Falha no login');
      }
    } catch (error) {
      setError('Falha na autenticação. Verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
  };

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
        <div className="mb-4 text-rec-500 text-center">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <InputField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Digite seu email"
        />
        <InputField
          label="Senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Digite sua senha"
          showPassword={showPassword}
          togglePassword={() => setShowPassword(!showPassword)}
        />
        <SubmitButton loading={loading}>Login</SubmitButton>
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
