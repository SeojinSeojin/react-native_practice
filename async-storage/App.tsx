import { QueryClient, QueryClientProvider } from 'react-query';
import TodoList from './components/TodoList';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TodoList />
    </QueryClientProvider>
  );
}
