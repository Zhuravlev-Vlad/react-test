import React, {useState} from 'react'
import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import style from './Search.module.sass'

import {actionChangeSearchQwery, actionSearchUser, actionGetRepositoriesFromUser} from './../../redux/actions/changeSearch'
import { State, listUsersItem } from './../../constants/types'

import Dropdown from './../Dropdown/Dropdown'

let timer: any = null

interface Props {
    changeSearch(value: string, page: number): void
    userSearch(value: string): void
    repositoriesFromUser(url: string): void
    users: listUsersItem
}

const Search: React.FC<Props> = (props) => {
    const { input, btn, group, inputGroup } = style
    const { changeSearch, userSearch, repositoriesFromUser, users } = props

    const [value, setValue] = useState<string>('');
    const [focus, setFocus] = useState<boolean>(false);

    const delayChange = (value: string): void => {
        clearTimeout(timer);
        timer = window.setTimeout(() => {
            userSearch(value);
        }, 350);
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const search_qwery = event.target.value
        setValue(search_qwery)
        delayChange(search_qwery)
    }

    const handleSubmit = (event: React.FormEvent): void => {
        event.preventDefault()
        changeSearch(value, 0)
    }

    const handleInputFocus = (): void => {
        setFocus(true)
    };
    
    const handleInputBlur = (): void => {
        setFocus(false)
    };

    const selectItemDropdown = (repos_url: string): void => {
        repositoriesFromUser(repos_url)
    }

    return (
        <form className={group} onSubmit={handleSubmit} noValidate={true}>
            <div className={inputGroup}>
                <input 
                    className={input} 
                    placeholder="Имя пользователя или название репозитория"
                    value={value}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}/>
                <Dropdown users={users} focus={focus} select={selectItemDropdown}/>
            </div>
            <button className={`${btn} btn`} type="submit">
                Найти
            </button>
        </form>
    )
}

const putStateToProps = (state: State) => {
    const {error, result, users} = state.searchReducer
    return {
      error,
      result,
      users
    }
}

const putActionsToProps = (dispatch: Dispatch) => {
    return {
        changeSearch: bindActionCreators(actionChangeSearchQwery, dispatch),
        userSearch: bindActionCreators(actionSearchUser, dispatch),
        repositoriesFromUser: bindActionCreators(actionGetRepositoriesFromUser, dispatch)
    }
}

export default connect(putStateToProps, putActionsToProps)(Search)