import React, { useState } from 'react';
import { FiPlus, FiLoader } from 'react-icons/fi';
import api from '../services/api';

export default function FormularioTarefa({ onTarefaCriada }) {
  const [titulo, setTitulo] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');

  const adicionar = async (e) => {
    e.preventDefault();
    
    if (!titulo.trim()) {
      setErro('Por favor, digite um título para a tarefa');
      return;
    }

    try {
      setCarregando(true);
      setErro('');
      const { data } = await api.post('/tarefas', { titulo: titulo.trim() });
      onTarefaCriada(data);
      setTitulo('');
    } catch (error) {
      setErro(error.message);
    } finally {
      setCarregando(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      adicionar(e);
    }
  };

  return (
    <div className="space-y-4">
      {erro && (
        <div className="error-message">
          <div className="flex items-center justify-between">
            <span>{erro}</span>
            <button
              onClick={() => setErro('')}
              className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200"
            >
              ×
            </button>
          </div>
        </div>
      )}

      <form onSubmit={adicionar} className="space-y-4">
        <div>
          <label 
            htmlFor="titulo-tarefa" 
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Título da tarefa
          </label>
          <input
            id="titulo-tarefa"
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Digite o título da sua tarefa..."
            disabled={carregando}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                       bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                       placeholder-gray-500 dark:placeholder-gray-400
                       focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-navy-500
                       disabled:opacity-50 disabled:cursor-not-allowed
                       transition-colors duration-200"
            maxLength={255}
          />
          <div className="flex justify-between items-center mt-1">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {titulo.length}/255 caracteres
            </span>
          </div>
        </div>

        <button
          type="submit"
          disabled={carregando || !titulo.trim()}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 
                     bg-navy-600 hover:bg-navy-700 disabled:bg-gray-400 
                     text-white font-medium rounded-lg
                     focus:outline-none focus:ring-2 focus:ring-navy-500 focus:ring-offset-2
                     disabled:cursor-not-allowed disabled:opacity-50
                     transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
        >
          {carregando ? (
            <>
              <FiLoader className="w-4 h-4 animate-spin" />
              Adicionando...
            </>
          ) : (
            <>
              <FiPlus className="w-4 h-4" />
              Adicionar Tarefa
            </>
          )}
        </button>
      </form>
    </div>
  );
}
