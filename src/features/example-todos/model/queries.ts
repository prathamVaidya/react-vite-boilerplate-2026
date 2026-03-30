import { useQuery } from "@tanstack/react-query";
import { api } from "../../../shared/api/client";

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

async function fetchTodos(): Promise<Todo[]> {
  return api.get("todos", { searchParams: { _limit: 5 } }).json<Todo[]>();
}

export function useTodosQuery() {
  return useQuery({
    queryKey: ["example-todos"],
    queryFn: fetchTodos,
  });
}

