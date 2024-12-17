import React, { useState, useEffect } from "react";

function MessagesSection({ tokens, onApproval, isLoading }) {
  const [selectedToken, setSelectedToken] = useState("");
  const [isTokenProcessed, setIsTokenProcessed] = useState(false);

  const handleApproval = (token, approvalStatus) => {
    onApproval(token, approvalStatus);
    setIsTokenProcessed(true);
  };

  useEffect(() => {
    // Resetar o estado de 'selectedToken' se o token for processado.
    if (isTokenProcessed) {
      setSelectedToken("");  // Limpa a seleção após processamento
    }
  }, [isTokenProcessed]);

  if (isLoading) {
    return <p className="text-gray-500">Carregando tokens...</p>;
  }

  return (
    <div className="flex-1 ml-4">
      <h3 className="text-2xl font-semibold mb-4">Mensagens</h3>
      <div className="bg-gray-50 p-4 border border-gray-200 rounded shadow-sm">
        <label className="block mb-2">
          Selecione um token de compartilhamento:
        </label>

        {/* Se não houver tokens, exibe mensagem */}
        {tokens.length === 0 ? (
          <p className="text-gray-500">Não há tokens pendentes no momento.</p>
        ) : (
          <>
            {!isTokenProcessed && (
              <select
                className="w-full p-2 border border-gray-300 rounded mb-4"
                onChange={(e) => setSelectedToken(e.target.value)}
                value={selectedToken}
                disabled={isTokenProcessed} // Desabilita o select após o processamento
              >
                <option value="">Escolha um token</option>
                {tokens.map((token) => (
                  <option key={token.id} value={token.token}>
                    {token.token} - Status: {token.status}
                  </option>
                ))}
              </select>
            )}
          </>
        )}

        {selectedToken && !isTokenProcessed && (
          <div className="flex justify-between">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
              onClick={() => handleApproval(selectedToken, true)}
              disabled={isTokenProcessed}
            >
              Aprovar
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
              onClick={() => handleApproval(selectedToken, false)}
              disabled={isTokenProcessed}
            >
              Rejeitar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default MessagesSection;
