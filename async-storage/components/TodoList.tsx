import React, { useState } from 'react';
import { useEffect } from 'react';
import {
  TextInput,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  View,
} from 'react-native';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  addTodo,
  completeTodo,
  deleteTodo,
  editTodo,
  getTodoList,
} from '../controllers/todo.controller';
import TodoItem from './TodoItem';
const { height } = Dimensions.get('screen');

function TodoList() {
  const [mode, setMode] = useState<'edit' | 'add'>('add');
  const [text, setText] = useState<string>('');
  const [editTarget, setEditTarget] = useState<null | Todo['id']>(null);
  const queryClient = useQueryClient();
  const { data: todoData } = useQuery('todo', () => getTodoList());
  const invalidateTodoListQueries = () => queryClient.invalidateQueries('todo');
  const addTodoMutation = useMutation(
    (content: Todo['content']) => addTodo(content),
    {
      onSuccess: () => invalidateTodoListQueries(),
    }
  );
  const editTodoMutation = useMutation(
    ({ content, id }: { content: Todo['content']; id: Todo['id'] }) =>
      editTodo(id, content),
    {
      onSuccess: () => invalidateTodoListQueries(),
    }
  );
  const completeTodoMutation = useMutation(
    (id: Todo['id']) => completeTodo(id),
    {
      onSuccess: () => invalidateTodoListQueries(),
    }
  );
  const deleteTodoMutation = useMutation((id: Todo['id']) => deleteTodo(id), {
    onSuccess: () => invalidateTodoListQueries(),
  });

  useEffect(() => {
    console.log(todoData);
  }, [todoData]);

  const setEditMode = (todoID: Todo['id']) => {
    setMode('edit');
    setEditTarget(todoID);
  };

  const setAddMode = () => {
    setMode('add');
    setEditTarget(null);
  };

  const onTextInputSubmit = () => {
    switch (mode) {
      case 'edit':
        if (!editTarget) return;
        editTodoMutation.mutate(
          { id: editTarget, content: text },
          {
            onSuccess: () => setAddMode(),
          }
        );
        break;
      case 'add':
        addTodoMutation.mutate(text);
    }
    setText('');
  };
  return (
    <View style={styles.container}>
      <ScrollView style={styles.todoContainer}>
        {todoData?.map((todo) => (
          <TodoItem
            todo={todo}
            onEdit={(id: Todo['id']) => setEditMode(id)}
            onComplete={(id: Todo['id']) => completeTodoMutation.mutate(id)}
            onDelete={(id: Todo['id']) => deleteTodoMutation.mutate(id)}
            key={todo.id}
          />
        ))}
      </ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TextInput
          style={styles.textInput}
          onSubmitEditing={onTextInputSubmit}
          value={text}
          onChangeText={(text) => setText(text)}
        />
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  todoContainer: {
    height: height,
    paddingBottom: 60,
  },
  textInput: {
    borderColor: 'black',
    borderWidth: 1,
    width: '100%',
    padding: 20,
    height: 60,
    backgroundColor: 'white',
    color: 'black',
  },
  textInputContainer: {
    position: 'absolute',
    bottom: 0,
  },
});

export default TodoList;
