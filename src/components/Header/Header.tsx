import { FC, ChangeEvent } from 'react'
import { HiFilter } from 'react-icons/hi'
import styles from './Header.module.scss'
import { IconButton, MenuButton, Input, Menu, MenuList, MenuOptionGroup, MenuItemOption } from '@chakra-ui/react';
import { ColorModeSwitcher } from '../ColorModeSwitcher/ColorModeSwitcher';


interface IHeader {
  onClick: (filterName: string) => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

export const Header: FC<IHeader> = ({onClick, onChange, value}) => {
  return (
    <header className={styles.header}>
        <div className={styles.container}>
          <span className={styles.logo}>Todo</span>
          <Input className={styles.input} variant='filled' onChange={onChange} value={value} placeholder='Search...' />
          <div className={styles.toolbar}>
            <Menu placement='bottom-end'>
              <MenuButton className={styles.filter}>
                <IconButton
                  display='flex'
                  as='span'
                  size="md"
                  fontSize="lg"
                  variant='unstyled'
                  color='white'
                  icon={<HiFilter />}
                  aria-label='Sort by'
                />
              </MenuButton>
              <MenuList zIndex='2'>
                <MenuOptionGroup defaultValue='all' title='Sort by' type='radio'>
                  <MenuItemOption onClick={() => onClick('all')} value='all'>All</MenuItemOption>
                  <MenuItemOption onClick={() => onClick('important')} value='important'>Important</MenuItemOption>
                  <MenuItemOption onClick={() => onClick('completed')} value='completed'>Completed</MenuItemOption>
                </MenuOptionGroup>
              </MenuList>
            </Menu>
            <ColorModeSwitcher className={styles.btn} />
          </div>
        </div>
    </header>
  )
}
