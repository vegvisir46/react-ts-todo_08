import { IconButton, Menu, MenuItem, MenuButton, MenuList, Checkbox, Textarea, Box, Button } from '@chakra-ui/react'
import { FC, useState, FormEvent, ChangeEvent } from 'react'
import { ITodo } from '../../types/types'
import { FiMoreVertical } from 'react-icons/fi'
import { MdDone, MdOutlineCancel } from 'react-icons/md'
import { AiOutlineDelete, AiOutlineExclamation, AiOutlineEdit } from 'react-icons/ai'
import styles from './TodoItem.module.scss'
import classNames from 'classnames';

interface ITodoItem {
    todo: ITodo
    removeTodo: (id: number) => void
    completeTodo: (id: number) => void
    importantTodo: (id: number) => void
    changeTitle: (id: number, newTitle: string) => void
}

export const TodoItem: FC<ITodoItem> = ({changeTitle, todo, removeTodo, completeTodo, importantTodo}) => {

    const [editTitle, setEditTitle] = useState<boolean>(false)
    const [newTitle, setNewTitle] = useState<string>(todo.title)

    const handleTitleEdit = () => {
        setEditTitle(!editTitle)
    }

    const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        e.preventDefault()
        setNewTitle(e.target.value)
    }
    
    const submitForm = (e: FormEvent<HTMLFormElement | HTMLButtonElement>) => {
        e.preventDefault()
        handleTitleEdit()
        if(todo.title !== newTitle && newTitle.trim()) {
            changeTitle(todo.id, newTitle)
            setNewTitle(todo.title)
        }
    }

    const cancelEdit = () => {
        handleTitleEdit()
        setNewTitle(todo.title)
    }

    return (
        <li className={classNames(styles.item, todo.completed ? styles.itemActive : '' )} >
            <span className={styles.left}>
                <span className={styles.date}>{todo.date}</span>
                <div className={styles.bottom}>
                    <Checkbox className={styles.checkbox} mr={3} isChecked={todo.completed} onChange={() => completeTodo(todo.id)} />
                    {editTitle ? (
                        <form onSubmit={submitForm}>
                            <Textarea onInput={onChange} value={newTitle} mb={2} className={styles.textarea} placeholder='Type title...' />

                            <Box>
                                <Button onClick={submitForm} mr={2} variant='outline' size='sm' colorScheme='green' className={styles.btn}><MdDone /></Button>
                                <Button onClick={cancelEdit} variant='outline' size='sm' colorScheme='red' className={styles.btn}><MdOutlineCancel /></Button>
                            </Box>
                        </form>
                    ) : (
                        <h3 className={classNames(styles.title, todo.important ? styles.titleImportant : null,)}>{todo.title}</h3>
                    )}
                </div>
            </span>

            <Menu placement='bottom-end'>
                <MenuButton
                    as={IconButton}
                    aria-label='Options'
                    icon={<FiMoreVertical/>}
                    variant='outline'
                    className={styles.menuBtn}
                />
                <MenuList zIndex='2'>
                    <MenuItem onClick={handleTitleEdit} className={styles.menuItem} icon={<AiOutlineEdit/>}>
                        {editTitle ? 'Cancel' : 'Edit title'}
                    </MenuItem>
                    <MenuItem onClick={() => importantTodo(todo.id)} className={styles.menuItem} icon={<AiOutlineExclamation/>}>
                        {todo.important ? 'Mark as unimportant' : 'Mark as important'}
                    </MenuItem>
                    <MenuItem onClick={() => removeTodo(todo.id)} className={styles.menuItem} icon={<AiOutlineDelete/>}>
                        Delete
                    </MenuItem>
                </MenuList>
            </Menu>
        </li>
    )
}
