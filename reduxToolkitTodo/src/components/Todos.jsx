import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeTodo, updateTodo } from '../features/todo/todoSlice'

function Todos() {
  const todos = useSelector((state) => state.todos)
  const dispatch = useDispatch()

  const [editId, setEditId] = useState(null)
  const [editText, setEditText] = useState('')

  const handleEdit = (todo) => {
    setEditId(todo.id)
    setEditText(todo.text)
  }

  const handleUpdate = () => {
    dispatch(
      updateTodo({
        id: editId,
        text: editText,
      })
    )

    setEditId(null)
    setEditText('')
  }

  return (
    <>
      <h2 className="text-white text-xl mb-4">Todos</h2>

      <ul className="list-none">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="mt-4 flex justify-between items-center bg-zinc-800 px-4 py-2 rounded"
          >
            {editId === todo.id ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="bg-gray-700 text-white px-2 py-1 rounded"
                />

                <button
                  onClick={handleUpdate}
                  className="ml-2 text-white bg-green-500 px-4 py-1 rounded hover:bg-green-600"
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <div className="text-white">{todo.text}</div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(todo)}
                    className="text-white bg-blue-500 px-4 py-1 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => dispatch(removeTodo(todo.id))}
                    className="text-white bg-red-500 px-4 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </>
  )
}

export default Todos