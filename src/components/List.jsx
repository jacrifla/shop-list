import React, { useState } from 'react';
import ShareListForm from './ShareListForm';
import { toast } from 'react-toastify';
import Modal from './Modal';

function List({ list, onClick, onShare, onDelete }) {
  const [showShareModal, setShowShareModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  const handleShare = async (email) => {
    try {
      await onShare(list.id, email);
      toast.success('Lista compartilhada com sucesso!');
      setShowShareModal(false);
    } catch (error) {
      toast.error(`Erro ao compartilhar: ${error.message}`);
    }
  };

  const handleDelete = async () => {
    try {
      await onDelete(list.id);
      setIsDeleted(true);
      setShowDeleteModal(false);
      toast.success('Lista excluída com sucesso!');
    } catch (error) {
      setDeleteError('Erro ao excluir a lista.');
      toast.error('Erro ao excluir a lista.');
    }
  };

  const confirmDelete = () => {
    setShowDeleteModal(true);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
  };

  if (isDeleted) return null;

  // Função para formatar a data em um formato legível
  const formatDate = (dateString) => {
    if (!dateString) return 'Data não disponível';

    const date = new Date(dateString);

    // Verifica se a data é inválida
    if (isNaN(date.getTime())) {
      return 'Data inválida';
    }

    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('pt-BR', options);
  };

  return (
    <div className='bg-white shadow p-6 rounded hover:shadow-md cursor-pointer transition flex items-center justify-between'>
      <div onClick={onClick} className='flex flex-col'>
        <h3 className='font-semibold text-lg'>{list.name}</h3>

        <p className='text-sm text-gray-500'>
          Criado: {formatDate(list.created_at)}
        </p>
      </div>

      <div className='flex flex-col items-start ml-4'>

        <button
          className='text-blue-500 hover:text-blue-700 transition mb-2'
          onClick={(e) => {
            e.stopPropagation();
            setShowShareModal(true);
          }}
        >
          <i className='fas fa-share-alt'></i>
        </button>

        <button
          className='text-red-500 hover:text-red-700 transition'
          onClick={(e) => {
            e.stopPropagation();
            confirmDelete();
          }}
        >
          <i className='fas fa-trash-alt'></i>
        </button>
      </div>

      {deleteError && (
        <div className='text-red-500 font-semibold mt-2'>{deleteError}</div>
      )}

      {showDeleteModal && (
        <Modal
          title='Tem certeza que deseja excluir esta lista?'
          onCancel={cancelDelete}
          onConfirm={handleDelete}
          confirmText='Excluir'
          cancelText='Cancelar'
        />
      )}

      {showShareModal && (
        <Modal
          title='Compartilhar Lista'
          onCancel={() => setShowShareModal(false)}
        >
          <ShareListForm onShare={(email) => handleShare(email)} />
        </Modal>
      )}
    </div>
  );
}

export default List;
