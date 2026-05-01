import './App.css'
import './index.css'
import { useState } from "react";

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

    const completeTodos = (id: string) => {
        setTodos(prev =>
            prev.map(todo =>
                todo.id === id
                    ? { ...todo, completed: !todo.completed }
                    : todo
            )
        )
    }

    const deleteTodo = (id: string) => {
        setTodos(prev =>
            prev.filter(todo => todo.id !== id)
        )
    }
    const completedCount = todos.filter(todo => todo.completed).length
    const activeCount = todos.filter(todo => !todo.completed).length

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-4 py-10">
            <div className="mx-auto w-full max-w-2xl">
                <div className="mb-6">
                    <p className="text-sm font-medium tracking-[0.2em] text-sky-300 uppercase">
                        React Study
                    </p>
                    <h1 className="mt-2 text-4xl font-bold tracking-tight text-white md:text-5xl">
                        Todo List
                    </h1>
                    <p className="mt-3 text-sm leading-6 text-slate-300 md:text-base">
                        간단한 할 일 관리를 통해 React 상태 관리와 배열 업데이트를 연습하는 예제입니다.
                    </p>
                </div>

                <div className="rounded-[32px] border border-white/10 bg-white/10 p-5 shadow-2xl backdrop-blur-xl md:p-6">
                    <div className="mb-5 grid grid-cols-3 gap-3">
                        <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                            <p className="text-xs font-medium text-slate-300">전체</p>
                            <p className="mt-2 text-2xl font-bold text-white">{todos.length}</p>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                            <p className="text-xs font-medium text-slate-300">진행 중</p>
                            <p className="mt-2 text-2xl font-bold text-white">{activeCount}</p>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                            <p className="text-xs font-medium text-slate-300">완료</p>
                            <p className="mt-2 text-2xl font-bold text-white">{completedCount}</p>
                        </div>
                    </div>

                    {/* 입력 영역 */}
                    <div className="rounded-3xl border border-white/10 bg-slate-950/40 p-3">
                        <div className="flex flex-col gap-3 sm:flex-row">
                            <input
                                className="h-14 flex-1 rounded-2xl border border-white/10 bg-white/10 px-4 text-base text-white placeholder:text-slate-400 outline-none transition focus:border-sky-400/60 focus:ring-2 focus:ring-sky-400/30"
                                value={task}
                                onChange={(event) => {
                                    setTask(event.target.value)
                                }}
                                onKeyDown={(event) => {
                                    if (event.key === "Enter") {
                                        addTodos()
                                    }
                                }}
                                placeholder="할 일을 입력하세요..."
                            />

                            <button
                                className="h-14 w-full rounded-2xl bg-sky-500 px-6 font-semibold text-white transition hover:bg-sky-400 active:scale-[0.98] sm:w-auto"
                                onClick={addTodos}
                            >
                                추가
                            </button>
                        </div>
                    </div>

                    {/* 리스트 */}
                    <div className="mt-6">
                        {todos.length === 0 ? (
                            <div className="rounded-3xl border border-dashed border-white/10 bg-black/10 px-6 py-14 text-center">
                                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-2xl">
                                    ✍️
                                </div>

                                <h2 className="text-lg font-semibold text-white">
                                    아직 등록된 할 일이 없습니다
                                </h2>

                                <p className="mt-2 text-sm leading-6 text-slate-300">
                                    해야 할 일을 입력하고 첫 번째 투두를 추가해보세요.
                                </p>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-3">
                                {todos.map(todo => (
                                    <div
                                        key={todo.id}
                                        className={
                                            "flex items-center justify-between gap-3 rounded-3xl border p-4 transition duration-200 " +
                                            (todo.completed
                                                ? "border-emerald-400/20 bg-emerald-400/10"
                                                : "border-white/10 bg-white/10 hover:bg-white/[0.14]")
                                        }
                                    >
                                        <div className="flex min-w-0 items-center gap-3">
                                            <button
                                                type="button"
                                                onClick={() => completeTodos(todo.id)}
                                                className={
                                                    "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-bold transition " +
                                                    (todo.completed
                                                        ? "border-emerald-300 bg-emerald-400 text-slate-900"
                                                        : "border-slate-400/50 bg-transparent text-transparent hover:border-sky-300")
                                                }
                                            >
                                                ✓
                                            </button>

                                            <span
                                                className={
                                                    "truncate text-base font-medium transition " +
                                                    (todo.completed
                                                        ? "text-slate-300 line-through"
                                                        : "text-white")
                                                }
                                            >
                            {todo.text}
                        </span>
                                        </div>

                                        <div className="flex shrink-0 items-center gap-2">
                                            <button
                                                className={
                                                    "rounded-xl px-4 py-2 text-sm font-medium text-white transition active:scale-[0.98] " +
                                                    (todo.completed
                                                        ? "bg-slate-600 hover:bg-slate-500"
                                                        : "bg-emerald-500 hover:bg-emerald-400")
                                                }
                                                onClick={() => completeTodos(todo.id)}
                                            >
                                                {todo.completed ? "취소" : "완료"}
                                            </button>

                                            <button
                                                className="rounded-xl bg-rose-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-rose-400 active:scale-[0.98]"
                                                onClick={() => deleteTodo(todo.id)}
                                            >
                                                삭제
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App