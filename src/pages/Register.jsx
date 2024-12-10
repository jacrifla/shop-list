import RegistrationForm from '../components/RegistrationForm';

function RegistrationPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-lg p-8 bg-white rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Cadastro</h2>
        <RegistrationForm />
      </div>
    </div>
  );
}

export default RegistrationPage;
