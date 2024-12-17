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
      console.error('Erro ao compartilhar lista:', error);
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
      console.error('Erro ao excluir lista:', error);
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

  return (
    <div className='bg-white shadow p-4 rounded hover:shadow-md cursor-pointer transition flex items-center justify-between'>
      <div onClick={onClick}>
        <h3 className='font-semibold text-lg'>{list.name}</h3>
      </div>

      <div className='flex flex-col items-start ml-4'>
        {/* Botão de Compartilhar (apenas ícone) */}
        <button
          className='text-blue-500 hover:text-blue-700 transition mb-2'
          onClick={(e) => {
            e.stopPropagation();
            setShowShareModal(true);
          }}
        >
          <i className='fas fa-share-alt'></i>
        </button>

        {/* Botão de Excluir (apenas ícone) */}
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

      {deleteError && <div className='text-red-500 font-semibold mt-2'>{deleteError}</div>}

      {/* Modal de Confirmação para Exclusão */}
      {showDeleteModal && (
        <Modal
          title='Tem certeza que deseja excluir esta lista?'
          onCancel={cancelDelete}
          onConfirm={handleDelete}
          confirmText='Excluir'
          cancelText='Cancelar'
        />
      )}

      {/* Modal de Compartilhamento */}
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
