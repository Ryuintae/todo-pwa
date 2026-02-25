import './App.css'
import './index.css'
import {useState} from "react";

interface Todo {
    id: string
    completed: boolean
    text: string
}

function App() {
    const [task, setTask] = useState<string>("")
    const [todos, setTodos] = useState<Todo[]>([])
    const addTodos = () => {
        if (task.trim() === "") return;

        setTodos(prev => [
            ...prev,
            {
                id: Date.now().toString(),
                text: task,
                completed: false
            }
        ]);

        setTask("");
    }
    const completeTodos = (id: string) =>{
        setTodos(prev =>
            prev.map(todo => todo.id === id ? {...todo, completed: !todo.completed} : todo))
    }
    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-neutral-900 to-neutral-700 flex items-center justify-center px-4">

                <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6">

                    <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
                        Todo List
                    </h1>

                    {/* 입력 영역 */}
                    <div className="flex gap-2">
                        <input
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            value={task}
                            onChange={(event) => {
                                setTask(event.target.value)
                            }}
                            placeholder="할 일을 입력하세요..."
                        />

                        <button
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:scale-95 transition"
                            onClick={() => {
                                addTodos()
                            }}
                        >
                            추가
                        </button>
                    </div>

                    {/* 리스트 */}
                    <div className="mt-6 flex flex-col gap-3">
                        {todos.map(todo => (
                            <div
                                key={todo.id}
                                className={"flex justify-between items-center bg-gray-100 px-4 py-3 rounded-lg shadow-sm hover:shadow-md transition"
                                + (todo.completed ? "bg-gray-50" : "bg-gray-100" )}
                            >
              <span className={todo.completed ? "text-gray-400 line-through": "text-gray-800"}>
                {todo.text}
              </span>

                                <button
                                    className={
                                        "text-sm px-3 py-1 text-white rounded-md active:scale-95 transition " +
                                        (todo.completed ? "bg-gray-500 hover:bg-gray-600" : "bg-green-500 hover:bg-green-600")
                                    }
                                    onClick={() => completeTodos(todo.id)}
                                >
                                    {todo.completed ? "취소" : "완료"}
                                </button>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </>
    )
}

export default App
