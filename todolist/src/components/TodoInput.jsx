import { useState } from 'react';

function TodoInput({ addTodo }) {
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault(); // 阻止表单默认刷新行为

        // 知识点：表单验证（不能为空判断，包含去除两端空格）
        if (inputValue.trim() === '') {
            alert('任务内容不能为空！');
            return;
        }

        addTodo(inputValue.trim());
        setInputValue(''); // 提交后清空输入框
    };

    return (
        <form onSubmit={handleSubmit} className="todo-form">
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="请输入你要做的事情..."
            />
            <button type="submit">添加</button>
        </form>
    );
}

export default TodoInput;