import AsyncStorage from '@react-native-async-storage/async-storage';

const TODO = 'todo';

export const resetTodoList = () => {
  AsyncStorage.setItem(TODO, JSON.stringify([]));
};

export const getTodoList = async (): Promise<Todo[]> => {
  const todoListString = await AsyncStorage.getItem(TODO);
  if (!todoListString) return [];
  return JSON.parse(todoListString);
};

export const addTodo = async (content: Todo['content']) => {
  const todo: Todo = {
    content,
    isCompleted: false,
    isDeleted: false,
    id: Math.random(),
  };
  const currentTodoList = await getTodoList();
  const addedTodoList = [...currentTodoList, todo];
  AsyncStorage.setItem(TODO, JSON.stringify(addedTodoList));
};

export const editTodo = async (id: Todo['id'], content?: Todo['content']) => {
  const currentTodoList = await getTodoList();
  const editedTodoList = currentTodoList.map((todo) =>
    todo.id === id
      ? {
          ...todo,
          content: content ?? todo.content,
        }
      : todo
  );
  AsyncStorage.setItem(TODO, JSON.stringify(editedTodoList));
};

export const deleteTodo = async (id: Todo['id']) => {
  const currentTodoList = await getTodoList();
  const deletedTodoList = currentTodoList.map((todo) =>
    todo.id === id ? { ...todo, isDeleted: true } : todo
  );
  AsyncStorage.setItem(TODO, JSON.stringify(deletedTodoList));
};

export const completeTodo = async (id: Todo['id']) => {
  const currentTodoList = await getTodoList();
  const completedTodoList = currentTodoList.map((todo) =>
    todo.id === id ? { ...todo, isCompleted: true } : todo
  );
  AsyncStorage.setItem(TODO, JSON.stringify(completedTodoList));
};
