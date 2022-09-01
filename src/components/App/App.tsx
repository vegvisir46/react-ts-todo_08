import { FC, useEffect, ChangeEvent, useState } from "react"
import { useToast } from "@chakra-ui/react"
import { TodoList } from "../TodoList/TodoList"
import { ITodo } from "../../types/types"
import { CreateTodoItem } from "../CreateTodoItem/CreateTodoItem"
import { Header } from "../Header/Header"
import './App.scss'

export const App: FC = () => {

  const [todos, setTodos] = useState<ITodo[]>([])
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [todosFilter, setTodosFilter] = useState<string>('all')
  const toast = useToast()
  
  useEffect(() => {
    setTodos(JSON.parse(localStorage.getItem('todos') || ""))
  }, [])

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const removeTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))

    toast({
      title: 'Todo deleted.',
      status: 'warning',
      duration: 2000,
      isClosable: true,
    })
  }

  const completeTodo = (id: number) => {
    setTodos(todos.map(todo => {
      if(todo.id === id) {
          todo.completed = !todo.completed
      }
      return todo
    }));
  }

  const importantTodo = (id: number) => {
    setTodos(todos.map(todo => {
      if(todo.id === id) {
          todo.important = !todo.important
      }
      return todo
    }));
  }

  const addedTodo = async (title: string) => {

    setSearchQuery('')

    const newTodo: ITodo = {
      id: Math.random(),
      title: title,
      important: false,
      completed: false,
      date: new Date().toLocaleString('ru'),
    }

    setTodos([...todos, newTodo])

    toast({
      title: 'Todo added',
      status: 'success',
      duration: 2000,
      isClosable: true,
    })
  }

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const filter = (items: ITodo[], filter = '') => {
    switch(filter) {
      case 'all':
          return items;
      case 'important':
          return items.filter(item => item.important);
      case 'completed':
          return items.filter(item => item.completed);
      default:    
          return items;
    }
  }

  const filterTodos = (filterName: string) => {
    setTodosFilter(filterName);
  }

  const changeTitle = (id: number, newTitle: string) => {
    setTodos(todos.map(todo => {
      if(todo.id === id) {
          todo.title = newTitle
      }
      return todo
    }));

    toast({
      title: 'Title changed',
      status: 'info',
      duration: 2000,
      isClosable: true,
    })
  }

  return (
    <>
      <Header
        onClick={filterTodos}
        value={searchQuery}
        onChange={handleSearch}
      />
      <div className="content">
        <CreateTodoItem addedTodo={addedTodo} />
        <TodoList
          changeTitle={changeTitle}
          importantTodo={importantTodo}
          searchQuery={searchQuery}
          completeTodo={completeTodo}
          removeTodo={removeTodo}
          items={filter(todos, todosFilter)}
        />
      </div>
    </>
  )
}