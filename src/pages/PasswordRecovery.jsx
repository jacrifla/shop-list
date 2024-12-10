import PasswordRecoveryForm from '../components/PasswordRecoveryForm';

function PasswordRecoveryPage() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-4">
        <h2 className="text-2xl font-bold mb-6 text-center">Recuperação de Senha</h2>
        <PasswordRecoveryForm />
      </div>
    </div>
  );
}

export default PasswordRecoveryPage;
