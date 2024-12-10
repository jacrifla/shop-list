import UserArea from '../components/UserArea/UserArea';
import Header from '../components/Header';

function UserProfilePage() {
  return (
    <div>
      {/* Header */}
      <Header />

      {/* Conteúdo principal */}
      <main className="p-8">
        <h2 className="text-3xl font-bold mb-4">Área do Usuário</h2>
        <UserArea />
      </main>
    </div>
  );
}

export default UserProfilePage;