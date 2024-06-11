import './App.css'
import React, { useCallback, useEffect, useReducer, useState } from 'react'

// definindo as ações adicionar, marcar como feito e deletar das tarefas
const taskReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TAREFA':
      return [...state, action.payload]
      // payload é o novo valor da tarefa que esta sendo adicionada
    case 'CONCLUIDO':
      const atualizarTarefa = [...state]
      atualizarTarefa[action.payload].completed = true
      return atualizarTarefa
    case 'DELETAR':
      return state.filter((_, index) => index !== action.payload)
      // filtra as tarefas para remover a tarefa no índice especificado
    default:
      return state
  }
}

function App() {
  const [tarefa, setTarefa] = useState('')

  const [tarefaAtual, dispatch] = useReducer(taskReducer, [])
  // dispatch - função utilizada para despachar as ações para o useReducer executar 

  // função adicionar tarefa
  const addTarefa = useCallback(() => {
    // usando o useCallback para que as tarefas permaneçam as mesmas entre as renderizacões
    // verificar se a tarefa nao ta vazia para que ela seja adicionada
    if (tarefa.trim() !== '') {
      dispatch({ type: 'ADD_TAREFA', payload: { text: tarefa, completed: false } })
      setTarefa('')
    }
  }, [tarefa])

  // função marcar tarefa como concluído
  const concluirTarefa = useCallback((index) => {
    dispatch({ type: 'CONCLUIDO', payload: index })
    // disparando ação tipo concluído para o use reducer
    // usando o meu dedo atual (payload) a partir do seu index (posição)
  }, [])

  // função deletar tarefa
  const deleteTarefa = useCallback((index) => {
    dispatch({ type: 'DELETAR', payload: index })
  }, [])

  return (
    <>
      <div className="center">
        <h1>Lista de Tarefas</h1>
        <div className="input">
          <input type="text"
            placeholder='Nova tarefa'
            value={tarefa}
            onChange={(e) => setTarefa(e.target.value)}
          />
          <button onClick={addTarefa}>Adicionar</button>
        </div>
        <ul>
          {/* criando nossa lista de tarefas
            vamos usar o .map para mapear cada tarefa da lista, seguindo um index de posição de cada tarefa
          */}
          {tarefaAtual.map((tarefas, index) => (
            // lista de tarefas de acordo com a posição 
            <li key={index}>
              <span style={{ textDecoration: tarefas.completed ? 'line-through' : 'none' }}>
                {/* adicionando style que verifica se a tarefa foi marcada como completed e adiciona um riscado,
                 se não foi marcado, não tem nada de textDecoration */}
                {tarefas.text}
              </span>
              {
                // verificar se a tarefa atual foi adicionada e se não está concluída
                // porque o completed inicial foi marcado como false
                !tarefas.completed && (
                  <>
                    {/* botão que chama função concluir tarefa a partir do seu index (posição) */}
                    <button onClick={() => concluirTarefa(index)}>Concluir tarefa</button>
                  </>
                )
              }
              {/* botão que chama função deletar tarefa a partir do seu index (posição) */}
              <button onClick={() => deleteTarefa(index)}>Deletar</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default App