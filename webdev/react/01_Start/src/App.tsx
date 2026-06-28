import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=7"
      );
      const data = await response.json();
      setData(data);
    };
    fetchData();
  }, []);
  return (
    <div className="app">
      <header className="app-header">
        <h1>My Todos</h1>
        <p>{data.length} items from the API</p>
      </header>
      <ul className="todo-list">
        {data.map((d) => (
          <Card
            userId={d.userId}
            title={d.title}
            completed={d.completed}
            key={d.id}
          />
        ))}
      </ul>
    </div>
  );
}

function Card(props) {
  const done = props.completed;
  return (
    <li className={`todo-card ${done ? "todo-card--done" : ""}`}>
      <span className="todo-card__status" aria-hidden="true">
        {done ? "✓" : ""}
      </span>
      <div className="todo-card__body">
        <p className="todo-card__meta">User {props.userId}</p>
        <p className="todo-card__title">{props.title}</p>
        <span
          className={`todo-card__badge ${
            done ? "todo-card__badge--done" : "todo-card__badge--pending"
          }`}
        >
          {done ? "Completed" : "Pending"}
        </span>
      </div>
    </li>
  );
}

export default App;
