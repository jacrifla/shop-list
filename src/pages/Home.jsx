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

function Home() {
  const [selectedListId, setSelectedListId] = useState(null);
  const [newListName, setNewListName] = useState('');
  const { userId } = useAuth();

  const { lists, addList, setLists } = useShoppingLists(userId);
  const items = useItems(selectedListId);

  const handleCreateList = async () => {
    if (userId && newListName.trim() !== '') {
      try {
        const newList = { userId, nameList: newListName.trim() };
        console.log('Criando nova lista:', newList);
        const response = await createShoppingList(newList);
        console.log('Resposta da criação da lista:', response);
        if (response && response.data) {
          addList(response.data);
          console.log('Estado das listas após adição:', lists); // Verifique aqui
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
      console.error('Erro ao compartilhar a lista:', error);
      toast.error('Erro ao compartilhar a lista.');
    }
  };

  const handleDeleteList = async (listId) => {
    try {
      const response = await deleteShoppingList(listId);
      if (response) {
        setLists((prevLists) => {
          const updatedLists = prevLists.filter((list) => list.id !== listId);
          return updatedLists;
        });
        toast.success('Lista excluída com sucesso!');
      }
    } catch (error) {
      toast.error('Erro ao excluir a lista.');
    }
  };

  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <div className='flex flex-1'>
        <Sidebar selectedListId={selectedListId} items={items} />
        <main className='flex-1 bg-gray-50 p-6'>
          <h2 className='text-2xl font-bold mb-4'>Minhas Listas de Compras</h2>
          <CreateList
            newListName={newListName}
            setNewListName={setNewListName}
            handleCreateList={handleCreateList}
          />
          {lists.length === 0 ? (
            <p>Nenhuma lista encontrada.</p>
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
              {lists.map((list) => (
                <List
                  key={list.id}
                  list={list}
                  onClick={() => setSelectedListId(list.id)}
                  onShare={handleShareList}
                  onDelete={handleDeleteList}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Home;
