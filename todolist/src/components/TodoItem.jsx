import { useState } from 'react';

function TodoItem({ todo, deleteTodo, toggleTodo, editTodo }) {
    // 局部状态：控制当前项是否处于"编辑模式"
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(todo.text);

    const handleSave = () => {
        // 知识点：修改时的表单验证
        if (editText.trim() === '') {
            alert('修改内容不能为空！');
            return;
        }
        editTodo(todo.id, editText.trim());
        setIsEditing(false); // 保存后退出编辑模式
    };

    return (
        <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            {/* 知识点：条件渲染 (三元运算符判断是显示输入框还是文本) */}
            {isEditing ? (
                <div className="edit-mode">
                    <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        autoFocus
                    />
                    <button onClick={handleSave} className="btn-save">保存</button>
                    <button onClick={() => setIsEditing(false)} className="btn-cancel">取消</button>
                </div>
            ) : (
                <div className="view-mode">
          <span
              className="todo-text"
              onClick={() => toggleTodo(todo.id)}
              title="点击切换完成状态"
          >
            {todo.text}
          </span>
                    <div className="actions">
                        <button onClick={() => setIsEditing(true)} className="btn-edit">编辑</button>
                        <button onClick={() => deleteTodo(todo.id)} className="btn-delete">删除</button>
                    </div>
                </div>
            )}
        </li>
    );
}

export default TodoItem;