import TodoItem from './TodoItem';

function TodoList({ todos, deleteTodo, toggleTodo, editTodo }) {
    // 知识点：条件渲染 (无数据时的兜底 UI)
    if (todos.length === 0) {
        return <div className="empty-tips">暂无待办事项，快去添加吧！ 🎉</div>;
    }

    return (
        <ul className="todo-list">
            {/* 知识点：列表渲染 (使用 map 遍历数组，且必须加 key) */}
            {todos.map(todo => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    deleteTodo={deleteTodo}
                    toggleTodo={toggleTodo}
                    editTodo={editTodo}
                />
            ))}
        </ul>
    );
}

export default TodoList;