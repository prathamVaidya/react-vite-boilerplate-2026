import { TodoList } from "../features/example-todos/ui/todo-list";
import { ExampleForm } from "../features/form-example/ui/example-form";

export function IndexPage() {
  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
      <TodoList />
      <ExampleForm />
    </div>
  );
}
