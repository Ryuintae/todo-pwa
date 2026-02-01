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
    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-neutral-600">
                <div className="text-2xl font-bold text-white">TodoList</div>

                <input className={"px-3 py-2 text-black rounded"}
                       value={task}
                       onChange={(event) => {
                           setTask(event.target.value)
                       }}
                />

                <button className={"px-y py-2 bg-blue-600 rounded"}
                        onClick={() => {
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
                        }}
                >
                    할 일 추가
                </button>

                <div className={"mt-4 w-64 flex flex-col gap-2"}>
                    {todos.map(todo =>
                        <div
                            key={todo.id}
                            className="bg-neutral-400 px-3 py-2 rounded"
                        >
                            {todo.text}
                        </div>
                    )}

                </div>

            </div>

        </>
    )
}

export default App
