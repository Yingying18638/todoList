import TodoList from "@/components/TodoList";
import Form from "@/components/Form";
import { ListProvider } from "@/context/listProvider";
export default function Home() {
  return (
    <main className="m-4">
      <ListProvider>
        <Form />
        <TodoList />
      </ListProvider>
    </main>
  );
}
