import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

function Home() {
  // Dados simulados de listas de compras
  const lists = [
    {
      name: 'Lista 1',
      items: ['Item 1', 'Item 2', 'Item 3'],
    },
    {
      name: 'Lista 2',
      items: ['Item A', 'Item B', 'Item C'],
    },
    {
      name: 'Lista 3',
      items: ['Produto X', 'Produto Y', 'Produto Z'],
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar lists={lists} />

        {/* Main Content */}
        <main className="flex-1 bg-gray-50 p-6">
          <h2 className="text-2xl font-bold mb-4">Minhas Listas de Compras</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {lists.map((list, index) => (
              <div key={index} className="p-4 bg-white rounded shadow hover:shadow-lg transition-shadow duration-200">
                <h3 className="text-lg font-semibold">{list.name}</h3>
                <p className="mt-2 text-gray-600">Descrição da lista de compras...</p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Home;
