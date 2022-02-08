import { useState } from "react";

function App() {
  const [allTodos, setAllTodos] = useState([]);
  const [todoName, setTododName] = useState("");
  const [error, setError] = useState("");

  const handleTodoChange = (e) => {
    setTododName(e.target.value);
  };
  const handleAddTodo = () => {
    //check todoName is empty or not
    if (!todoName) {
      setError("Todo field is empty.Please fill that field");
      return;
    }

    const id = allTodos.length > 0 ? allTodos.length - 1 : 1;
    setAllTodos((prev) => [...prev, { id, todoName }]);
    setTododName("");
  };

  return (
    <div className="App">
      {allTodos.map((todo) => (
        <div
          key={todo.id}
          style={{ display: "flex", alignItems: "center", gap: "40px" }}
          data-testid="todo"
        >
          <h2>{todo.todoName}</h2>
          <button
            onClick={() =>
              setAllTodos((prev) => prev.filter((t) => t.id !== todo.id))
            }
            data-testid={todo.id}
          >
            Delete todo
          </button>
        </div>
      ))}
      <input
        onChange={handleTodoChange}
        data-testid="todoInput"
        // value={todoName}
      />
      <button onClick={handleAddTodo}>Add Todo</button>
      {error && <h4 id="errorMsg">{error}</h4>}
    </div>
  );
}

export default App;
