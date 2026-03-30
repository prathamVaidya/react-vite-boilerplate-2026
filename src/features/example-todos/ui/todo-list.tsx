import { useTodosQuery } from "../model/queries";

export function TodoList() {
  const { data, isLoading, isError } = useTodosQuery();

  if (isLoading) {
    return <div className="p-2">Loading example todos...</div>;
  }

  if (isError || !data) {
    return <div className="p-2">Failed to load example todos.</div>;
  }

  return (
    <div className="p-2">
      <h3>Example Todos (React Query + ky)</h3>
      <ul>
        {data.map((todo) => (
          <li key={todo.id}>
            <span>{todo.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
