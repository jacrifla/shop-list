import LoginForm from '../components/LoginForm';

function LoginPage() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-4">
        <LoginForm />
      </div>
    </div>
  );
}

export default LoginPage;
