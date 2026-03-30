import { TodoList } from "@features/example-todos/ui/todo-list";
import { ExampleForm } from "@features/form-example/ui/example-form";
import { useTranslation } from "react-i18next";

export function IndexPage() {
  const { t } = useTranslation();

  return (
    <div className="p-2">
      <h3>{t("pages.home.title")}</h3>
      <TodoList />
      <ExampleForm />
    </div>
  );
}
