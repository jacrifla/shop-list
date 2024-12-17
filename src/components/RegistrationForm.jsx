import React, { useState } from "react";
import { createUser } from "../services/userService";
import { useNavigate } from "react-router-dom";
import InputField from './InputField';
import SubmitButton from './SubmitButton';
import { formatTitleCase } from '../utils/function';

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
      <InputField
        type="text"
        placeholder="Nome"
        value={name}
        onChange={(e) => setName(formatTitleCase(e.target.value))}
        required
      />
      <InputField
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value.toLowerCase())}
        required
      />
      <InputField
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <InputField
        type="password"
        placeholder="Confirmar Senha"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />
      <SubmitButton loading={loading}>Cadastrar</SubmitButton>
      <div className="mt-4 text-center">
        <p className="text-gray-600">
          Já tem uma conta? <a href="/" className="text-blue-500 hover:underline">Faça login aqui</a>
        </p>
      </div>
    </form>
  );
}

export default RegistrationForm;
