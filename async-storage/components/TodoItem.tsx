import React from 'react';
import { Button, StyleSheet, View, Text } from 'react-native';

function TodoItem(props: {
  todo: Todo;
  onEdit: (id: Todo['id']) => void;
  onComplete: (id: Todo['id']) => void;
  onDelete: (id: Todo['id']) => void;
}) {
  const { todo, onEdit, onComplete, onDelete } = props;
  return (
    <View
      style={[
        styles.wrapper,
        todo.isCompleted
          ? styles.completed
          : todo.isDeleted
          ? styles.deleted
          : null,
      ]}
    >
      <Text>{todo.content}</Text>
      {!todo.isCompleted && !todo.isDeleted && (
        <View style={styles.buttonWrapper}>
          <Button title='수정' onPress={() => onEdit(todo.id)} />
          <Button title='완료' onPress={() => onComplete(todo.id)} />
          <Button title='삭제' onPress={() => onDelete(todo.id)} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: 36,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonWrapper: { flexDirection: 'row' },
  completed: { flexDirection: 'row-reverse', backgroundColor: 'green' },
  deleted: { flexDirection: 'row-reverse', backgroundColor: 'red' },
});

export default TodoItem;
