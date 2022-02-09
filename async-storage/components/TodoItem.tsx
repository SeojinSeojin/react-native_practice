import React from 'react';
import { Button } from 'react-native';

function TodoItem(props: {
  todo: Todo;
  onEdit: (id: Todo['id']) => void;
  onComplete: (id: Todo['id']) => void;
  onDelete: (id: Todo['id']) => void;
}) {
  const { todo, onEdit, onComplete, onDelete } = props;
  return (
    <div>
      <div>{todo.content}</div>
      {!todo.isCompleted && !todo.isDeleted && (
        <>
          <Button title='수정' onPress={() => onEdit(todo.id)} />
          <Button title='완료' onPress={() => onComplete(todo.id)} />
          <Button title='삭제' onPress={() => onDelete(todo.id)} />
        </>
      )}
    </div>
  );
}

export default TodoItem;
