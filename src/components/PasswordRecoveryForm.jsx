import React, { useState } from "react";
import { resetPassword } from "../services/userService";
import { useNavigate } from "react-router-dom";
import InputField from './InputField';
import SubmitButton from './SubmitButton';

function PasswordRecoveryForm() {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (newPassword !== confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    setLoading(true);

    try {
      const response = await resetPassword(email, newPassword);
            
      if (response.success) {
        setSuccess(response.message);
        setEmail('');
        setNewPassword('');
        setConfirmPassword('');
        setTimeout(() => {
          navigate('/');
        }, 2000);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-lg">
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
      <form onSubmit={handleSubmit}>
        <InputField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Digite seu email"
        />
        <InputField
          label="Nova Senha"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Digite sua nova senha"
          showPassword={showNewPassword}
          togglePassword={() => setShowNewPassword(!showNewPassword)}
        />
        <InputField
          label="Confirmar Nova Senha"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirme sua nova senha"
          showPassword={showConfirmPassword}
          togglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
        />
        <SubmitButton loading={loading}>
          Recuperar Senha
        </SubmitButton>
      </form>
    </div>
  );
}

export default PasswordRecoveryForm;
