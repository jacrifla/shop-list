import React, { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/SidebarArea/Sidebar';
import List from '../components/List';
import CreateList from '../components/CreateList';
import { useAuth } from '../context/AuthContext';
import useShoppingLists from '../hooks/userShoppingLists';
import useItems from '../hooks/useItems';
import { createShoppingList, deleteShoppingList } from '../services/shoppingListService';
import { toast } from 'react-toastify';
import { createShareTokenWithUser } from '../services/shareTokenService';
import { formatTitleCase } from '../utils/function';

function Home() {
  const [selectedListId, setSelectedListId] = useState(null);
  const [newListName, setNewListName] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { userId } = useAuth();

  const { lists, addList, setLists } = useShoppingLists(parseInt(userId));
  const { items, setItems } = useItems(selectedListId);

  const handleCreateList = async () => {
    if (userId && newListName.trim() !== '') {
        try {
            const formattedName = formatTitleCase(newListName.trim());
            const newList = { userId, name: formattedName };

            const response = await createShoppingList(newList);
            if (response && response.data) {
                // Adiciona a data de criação da lista
                addList({
                    ...response.data
                });
                setNewListName('');
                toast.success('Lista criada com sucesso!');
            }
        } catch (error) {
            console.error('Erro ao criar a lista:', error);
            toast.error('Erro ao criar a lista. Tente novamente.');
        }
    } else {
        toast.error('O nome da lista não pode estar vazio.');
    }
};

  const handleShareList = async (listId, email) => {
    try {
      await createShareTokenWithUser(listId, email);
      toast.success('Lista compartilhada com sucesso!');
    } catch (error) {
      toast.error('Erro ao compartilhar a lista.');
    }
  };

  const handleDeleteList = async (listId) => {
    try {
      const response = await deleteShoppingList(listId);
      if (response) {
        setLists((prevLists) => prevLists.filter((list) => list.id !== listId));
        toast.success('Lista excluída com sucesso!');
      }
    } catch (error) {
      toast.error('Erro ao excluir a lista.');
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev); // Alterna a visibilidade do sidebar
  };

  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <div className="flex flex-1 relative">
        {/* Sidebar no modo overlay em telas pequenas e médias */}
        {isSidebarOpen && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-10 sm:w-3/4 md:w-1/2 lg:w-1/4 p-4">
            <div className="bg-white shadow-lg rounded-lg w-full h-full">
              <Sidebar
                selectedListId={selectedListId}
                items={items}
                setItems={setItems}
                toggleSidebar={toggleSidebar} // Passando a função toggleSidebar como prop
              />
            </div>
          </div>
        )}

        {/* Principal área de conteúdo */}
        <main className={`flex-1 bg-gray-50 p-6 lg:ml-6 ${isSidebarOpen ? 'opacity-50' : ''}`}>
          <h2 className="text-2xl font-bold mb-4">Minhas Listas de Compras</h2>
          <CreateList
            newListName={newListName}
            setNewListName={setNewListName}
            handleCreateList={handleCreateList}
          />
          
          {/* Exibição das listas */}
          {lists.length === 0 ? (
            <p>Nenhuma lista encontrada.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {lists.map((list) => (
                <div key={list.id}>
                  <List
                    list={list}
                    onClick={() => {
                      setSelectedListId(list.id);
                      toggleSidebar(); // Abre o sidebar ao clicar na lista
                    }}
                    onShare={handleShareList}
                    onDelete={handleDeleteList}
                  />
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Home;
