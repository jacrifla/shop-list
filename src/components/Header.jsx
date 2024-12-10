import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Header() {
  const { isAuthenticated, logout } = useAuth();
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleLogout = () => {
    logout();
    handleClose();
  };

  return (
    <header className="bg-gray-800 text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-3xl font-bold">Lista de Compras</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a href="/home" className="text-gray-300 hover:text-white transition duration-200 no-underline">Home</a>
            </li>
            {!isAuthenticated ? (
              <>
                <li>
                  <a href="/login" className="text-gray-300 hover:text-white transition duration-200 no-underline">Login</a>
                </li>
                <li>
                  <a href="/register" className="text-gray-300 hover:text-white transition duration-200 no-underline">Cadastro</a>
                </li>
              </>
            ) : (
              <>
                <li>
                  <a href="/user-profile" className="text-gray-300 hover:text-white transition duration-200 no-underline">Perfil</a>
                </li>
                <li>
                  <button
                    onClick={handleShow}
                    className="text-red-500 hover:text-red-700 underline transition duration-200 no-underline"
                  >
                    Sair
                  </button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>

      {/* Modal de confirmação de logout */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-lg font-semibold">Confirmação</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Tem certeza de que deseja sair?</p>
        </Modal.Body>
        <Modal.Footer>
          <button
            onClick={handleClose}
            className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded-md transition duration-200"
          >
            Cancelar
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition duration-200"
          >
            Sair
          </button>
        </Modal.Footer>
      </Modal>
    </header>
  );
}

export default Header;
