import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { deleteUser } from '../../services/userService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function DangerZone({ userId }) {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteUser(userId);
      toast.success('Conta excluída com sucesso!');
      navigate('/');
    } catch (error) {
      toast.error('Erro ao excluir a conta. Tente novamente mais tarde.');
    }
    setShow(false); // Fecha o modal após a ação
  };

  return (
    <div className="mt-8 bg-red-100 p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-2 text-red-800">Danger Zone</h3>
      <p className="mb-4 text-red-700">Cuidado! Excluir sua conta é uma ação irreversível.</p>
      <button
        className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition duration-300"
        onClick={() => setShow(true)}
      >
        Excluir Conta
      </button>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmação</Modal.Title>
        </Modal.Header>
        <Modal.Body>Tem certeza de que deseja excluir sua conta?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>Cancelar</Button>
          <Button variant="danger" onClick={handleDelete}>Excluir</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default DangerZone;
