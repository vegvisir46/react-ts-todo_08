import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import { ChangeEvent, FC, useState, FormEvent } from 'react'
import styles from './CreateTodoItem.module.scss'
import { IoAddOutline } from 'react-icons/io5'

interface ICreate {
  addedTodo: (todoTitle: string) => void
}

export const CreateTodoItem: FC<ICreate> = ({addedTodo}) => {

  const [todoTitle, setTodoTitle] = useState<string>('')
  
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setTodoTitle(e.target.value)
  }
  
  const submitForm = (e: FormEvent<HTMLFormElement | HTMLButtonElement>) => {
    e.preventDefault()
    if(todoTitle.trim()) {
      addedTodo(todoTitle)
      setTodoTitle('')
    }
  }

  return (
    <form onSubmit={submitForm} className={styles.container}>
      <InputGroup size='lg'>
        <Input
          pr='4.5rem'
          type='text'
          placeholder='Add todo'
          className={styles.input}
          onChange={onChange}
          value={todoTitle}
        />
        <InputRightElement width='4.5rem'>
          <Button onClick={submitForm} width='30px' height='30px' size=''>
            <IoAddOutline />
          </Button>
        </InputRightElement>
      </InputGroup>
    </form>
  )
}
