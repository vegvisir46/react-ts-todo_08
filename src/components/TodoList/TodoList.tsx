import { FC } from 'react'
import { ITodo } from '../../types/types'
import { TodoItem } from '../TodoItem/TodoItem'
import { Text } from '@chakra-ui/react'

interface ITodoList {
  items: ITodo[]
  searchQuery: string;
  removeTodo: (id: number) => void;
  completeTodo: (id: number) => void;
  importantTodo: (id: number) => void;
  changeTitle: (id: number, newTitle: string) => void
}

export const TodoList: FC<ITodoList> = ({changeTitle, searchQuery, items, removeTodo, completeTodo, importantTodo}) => {

  const filtredTodos = items.filter((todo) =>
    todo.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if(!filtredTodos.length) return <Text mt='20px' fontSize='14px' fontWeight='700' textTransform='uppercase' textAlign='center'>Todo list is empty</Text>

  return (
    <ul>
      {filtredTodos.map((todo: ITodo) => (
        <TodoItem changeTitle={changeTitle} importantTodo={importantTodo} completeTodo={completeTodo} removeTodo={removeTodo} key={todo.id} todo={todo} />
      ))}
    </ul>
  )
}