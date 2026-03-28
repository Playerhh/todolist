import { useState, useEffect } from 'react';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import './App.css';

function App() {
    // 知识点：useState 状态管理 & localStorage 本地存储 (初始化读取)
    const [todos, setTodos] = useState(() => {
        const savedTodos = localStorage.getItem('todos_data');
        return savedTodos ? JSON.parse(savedTodos) : [];
    });

    // 知识点：useEffect 副作用 (当 todos 发生变化时，自动同步到 localStorage)
    useEffect(() => {
        localStorage.setItem('todos_data', JSON.stringify(todos));
    }, [todos]);

    // 【增】添加任务
    const addTodo = (text) => {
        const newTodo = { id: Date.now(), text, completed: false };
        setTodos([newTodo, ...todos]);
    };

    // 【删】删除任务
    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    // 【改】切换完成状态
    const toggleTodo = (id) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    // 【改】保存编辑后的文本
    const editTodo = (id, newText) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, text: newText } : todo
        ));
    };

    return (
        <div className="app-container">
            <h1>待办事项清单</h1>
            <TodoInput addTodo={addTodo} />
            {/* 知识点：将状态和操作方法作为 props 传递给子组件 */}
            <TodoList
                todos={todos}
                deleteTodo={deleteTodo}
                toggleTodo={toggleTodo}
                editTodo={editTodo}
            />
        </div>
    );
}

export default App;