import { useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [inputText, setInputText] = useState('');

  const addTask = () => {
    const text = inputText.trim();
    if (!text) return;
    setTasks([...tasks, { id: Date.now(), text, completed: false }]);
    setInputText('');
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') addTask();
  };

  return (
    <div className="container">
      <h1>タスクボード</h1>

      <div className="input-area">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="タスクを入力..."
        />
        <button onClick={addTask}>追加</button>
      </div>

      {tasks.length === 0 ? (
        <p className="empty-message">タスクがありません</p>
      ) : (
        <ul className="task-list">
          {tasks.map(task => (
            <li key={task.id} className={`task-item${task.completed ? ' completed' : ''}`}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
              />
              <span className="task-text">{task.text}</span>
              <button className="delete-btn" onClick={() => deleteTask(task.id)}>削除</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
