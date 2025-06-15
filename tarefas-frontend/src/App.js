import React, { useState, useEffect } from 'react';
import { FiSun, FiMoon, FiRefreshCw } from 'react-icons/fi';
import api from './services/api';
import FormularioTarefa from './components/FormularioTarefa';
import ListaDeTarefas from './components/ListaDeTarefas';
import './index.css';

export default function App() {
  const [tarefas, setTarefas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');
  const [modoEscuro, setModoEscuro] = useState(() => {
    const saved = localStorage.getItem('modoEscuro');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', modoEscuro);
    localStorage.setItem('modoEscuro', JSON.stringify(modoEscuro));
  }, [modoEscuro]);

  useEffect(() => {
    carregarTarefas();
  }, []);

  const carregarTarefas = async () => {
    try {
      setCarregando(true);
      setErro('');
      const { data } = await api.get('/tarefas');
      setTarefas(data);
    } catch (error) {
      setErro(error.message);
    } finally {
      setCarregando(false);
    }
  };

  const adicionarTarefa = (novaTarefa) => {
    setTarefas([novaTarefa, ...tarefas]);
  };

  const atualizarTarefa = ({ id, status }) => {
    setTarefas(tarefas.map(t => (t.id === id ? { ...t, status } : t)));
  };

  const removerTarefa = (id) => {
    setTarefas(tarefas.filter(t => t.id !== id));
  };

  const alternarModoEscuro = () => {
    setModoEscuro(!modoEscuro);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Minhas Tarefas
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Organize suas atividades de forma simples e eficiente
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={carregarTarefas}
              disabled={carregando}
              className="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 disabled:opacity-50"
              title="Recarregar tarefas"
            >
              <FiRefreshCw className={`w-5 h-5 text-gray-600 dark:text-gray-400 ${carregando ? 'animate-spin' : ''}`} />
            </button>
            
            <button
              onClick={alternarModoEscuro}
              className="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
              title={modoEscuro ? 'Modo claro' : 'Modo escuro'}
            >
              {modoEscuro ? (
                <FiSun className="w-5 h-5 text-yellow-500" />
              ) : (
                <FiMoon className="w-5 h-5 text-gray-600" />
              )}
            </button>
          </div>
        </header>

    
        {erro && (
          <div className="error-message mb-6">
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

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="order-1 lg:order-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Nova Tarefa
              </h2>
              <FormularioTarefa onTarefaCriada={adicionarTarefa} />
            </div>
          </div>

          {/* List Section */}
          <div className="order-2 lg:order-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Lista de Tarefas
                </h2>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {tarefas.length} {tarefas.length === 1 ? 'tarefa' : 'tarefas'}
                </span>
              </div>
              
              {carregando ? (
                <div className="flex items-center justify-center py-8">
                  <div className="loading-spinner mr-3"></div>
                  <span className="text-gray-600 dark:text-gray-400">
                    Carregando tarefas...
                  </span>
                </div>
              ) : (
                <ListaDeTarefas
                  tarefas={tarefas}
                  onAtualizar={atualizarTarefa}
                  onRemover={removerTarefa}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
