import React from 'react';
import { FiCheckCircle, FiClock, FiInbox } from 'react-icons/fi';
import TarefaItem from './TarefaItem';

export default function ListaDeTarefas({ tarefas, onAtualizar, onRemover }) {
  const tarefasConcluidas = tarefas.filter(t => t.status === 'concluída');
  const tarefasPendentes = tarefas.filter(t => t.status === 'pendente');

  if (tarefas.length === 0) {
    return (
      <div className="text-center py-12">
        <FiInbox className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          Nenhuma tarefa ainda
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          Adicione sua primeira tarefa para começar!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Tarefas Pendentes */}
      {tarefasPendentes.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <FiClock className="w-4 h-4 text-orange-500" />
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
              Pendentes ({tarefasPendentes.length})
            </h3>
          </div>
          <div className="space-y-2">
            {tarefasPendentes.map(tarefa => (
              <TarefaItem
                key={tarefa.id}
                tarefa={tarefa}
                onAtualizar={onAtualizar}
                onRemover={onRemover}
              />
            ))}
          </div>
        </div>
      )}

      {/* Tarefas Concluídas */}
      {tarefasConcluidas.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <FiCheckCircle className="w-4 h-4 text-green-500" />
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
              Concluídas ({tarefasConcluidas.length})
            </h3>
          </div>
          <div className="space-y-2">
            {tarefasConcluidas.map(tarefa => (
              <TarefaItem
                key={tarefa.id}
                tarefa={tarefa}
                onAtualizar={onAtualizar}
                onRemover={onRemover}
              />
            ))}
          </div>
        </div>
      )}

      {/* Progress Summary */}
      {tarefas.length > 0 && (
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>
              Progresso: {tarefasConcluidas.length} de {tarefas.length} tarefas
            </span>
            <span>
              {tarefas.length > 0 ? Math.round((tarefasConcluidas.length / tarefas.length) * 100) : 0}%
            </span>
          </div>
          <div className="mt-2 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-navy-500 to-navy-600 h-2 rounded-full transition-all duration-300"
              style={{ 
                width: `${tarefas.length > 0 ? (tarefasConcluidas.length / tarefas.length) * 100 : 0}%` 
              }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
}
