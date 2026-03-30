import { TodoList } from "../features/example-todos/ui/todo-list";

export function IndexPage() {
  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
      <TodoList />
    </div>
  );
}
