import React, { useState } from "react";
import {
  FiCheck,
  FiClock,
  FiTrash2,
  FiLoader,
  FiRotateCcw,
} from "react-icons/fi";
import api from "../services/api";

export default function TarefaItem({ tarefa, onAtualizar, onRemover }) {
  const [carregandoStatus, setCarregandoStatus] = useState(false);
  const [carregandoRemocao, setCarregandoRemocao] = useState(false);

  const alternarStatus = async () => {
    try {
      setCarregandoStatus(true);
      const novoStatus =
        tarefa.status === "pendente" ? "concluída" : "pendente";
      const { data } = await api.patch(`/tarefas/${tarefa.id}`, {
        status: novoStatus,
      });
      onAtualizar(data);
    } catch (error) {
      console.error("Erro ao alterar status:", error);
    } finally {
      setCarregandoStatus(false);
    }
  };

  const remover = async () => {
    if (!window.confirm("Tem certeza que deseja remover esta tarefa?")) {
      return;
    }

    try {
      setCarregandoRemocao(true);
      await api.delete(`/tarefas/${tarefa.id}`);
      onRemover(tarefa.id);
    } catch (error) {
      console.error("Erro ao remover tarefa:", error);
    } finally {
      setCarregandoRemocao(false);
    }
  };

  const estaConcluida = tarefa.status === "concluída";

  return (
    <div
      className={`
      group relative p-4 rounded-lg border transition-all duration-200
      ${
        estaConcluida
          ? "bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800"
          : "bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:shadow-md"
      }
    `}
    >
      <div className="flex items-center gap-3">
        <button
          onClick={alternarStatus}
          disabled={carregandoStatus}
          className={`
            flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200
            ${
              estaConcluida
                ? "bg-green-500 border-green-500 text-white"
                : "border-gray-300 dark:border-gray-500 hover:border-navy-500 dark:hover:border-navy-400"
            }
            ${
              carregandoStatus
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer"
            }
          `}
          title={
            estaConcluida ? "Marcar como pendente" : "Marcar como concluída"
          }
        >
          {carregandoStatus ? (
            <FiLoader className="w-3 h-3 animate-spin" />
          ) : estaConcluida ? (
            <FiCheck className="w-3 h-3" />
          ) : null}
        </button>

        <div className="flex-1 min-w-0">
          <p
            className={`
            text-sm font-medium transition-all duration-200
            ${
              estaConcluida
                ? "text-green-700 dark:text-green-300 line-through opacity-75"
                : "text-gray-900 dark:text-white"
            }
          `}
          >
            {tarefa.titulo}
          </p>

          <div className="flex items-center gap-2 mt-1">
            <div
              className={`
              inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium
              ${
                estaConcluida
                  ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                  : "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300"
              }
            `}
            >
              {estaConcluida ? (
                <>
                  <FiCheck className="w-3 h-3" />
                  Concluída
                </>
              ) : (
                <>
                  <FiClock className="w-3 h-3" />
                  Pendente
                </>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={alternarStatus}
            disabled={carregandoStatus}
            className={`
              p-2 rounded-lg text-xs font-medium transition-all duration-200
              ${
                estaConcluida
                  ? "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 hover:bg-orange-200 dark:hover:bg-orange-900/50"
                  : "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-900/50"
              }
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
            title={estaConcluida ? "Reabrir tarefa" : "Concluir tarefa"}
          >
            {carregandoStatus ? (
              <FiLoader className="w-4 h-4 animate-spin" />
            ) : estaConcluida ? (
              <>
                <FiRotateCcw className="w-4 h-4" />
              </>
            ) : (
              <>
                <FiCheck className="w-4 h-4" />
              </>
            )}
          </button>

          <button
            onClick={remover}
            disabled={carregandoRemocao}
            className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 
                       hover:bg-red-200 dark:hover:bg-red-900/50 transition-all duration-200
                       disabled:opacity-50 disabled:cursor-not-allowed"
            title="Remover tarefa"
          >
            {carregandoRemocao ? (
              <FiLoader className="w-4 h-4 animate-spin" />
            ) : (
              <FiTrash2 className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
