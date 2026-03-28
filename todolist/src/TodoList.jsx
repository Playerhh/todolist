import { useState, useEffect } from 'react';

export default function TodoList() {
    // 1. 状态：任务列表 + 输入框内容
    const [todos, setTodos] = useState([]);
    const [inputVal, setInputVal] = useState('');

    // 2. 页面一加载，从本地存储读取数据
    useEffect(() => {
        const localData = localStorage.getItem('todos');
        if (localData) {
            setTodos(JSON.parse(localData));
        }
    }, []);

    // 3. 保存到本地存储（每次 todos 变化就存）
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    // 4. 添加任务
    const addTodo = () => {
        // 表单验证：不能为空
        if (!inputVal.trim()) {
            alert('请输入任务内容！');
            return;
        }

        const newTodo = {
            id: Date.now(), // 用时间戳当唯一 id
            content: inputVal,
            finished: false, // 是否完成
        };

        setTodos([newTodo, ...todos]);
        setInputVal(''); // 清空输入框
    };

    // 5. 切换完成状态
    const toggleFinish = (id) => {
        setTodos(
            todos.map(todo =>
                todo.id === id ? { ...todo, finished: !todo.finished } : todo
            )
        );
    };

    // 6. 删除任务
    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    return (
        <div style={{ maxWidth: '500px', margin: '30px auto', padding: '20px' }}>
            <h2>待办清单 TodoList</h2>

            {/* 输入框 + 添加按钮 */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <input
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addTodo()}
                    placeholder="输入任务，按回车添加"
                    style={{ flex: 1, padding: '8px' }}
                />
                <button onClick={addTodo} style={{ padding: '8px 16px' }}>
                    添加
                </button>
            </div>

            {/* 任务列表 */}
            <div>
                {todos.length === 0 ? (
                    <p>暂无任务，快去添加一个吧～</p>
                ) : (
                    todos.map(todo => (
                        <div
                            key={todo.id}
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '10px',
                                borderBottom: '1px solid #eee',
                                textDecoration: todo.finished ? 'line-through' : 'none',
                                color: todo.finished ? '#999' : '#000',
                            }}
                        >
              <span onClick={() => toggleFinish(todo.id)} style={{ cursor: 'pointer' }}>
                {todo.content}
              </span>
                            <button onClick={() => deleteTodo(todo.id)} style={{ color: 'red' }}>
                                删除
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}