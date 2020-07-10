import React, { useState } from 'react'
import style from './Dropdown.module.sass'
import { listUsersItem } from './../../constants/types'
interface Props {
    users: listUsersItem,
    focus: boolean,
    select: (repos_url: string) => void
}
const Dropdown: React.FC<Props> = (props) => {
    const { users, focus, select } = props
    const { img, itemWrap, dropdown } = style
    const [hover, setHover] = useState<boolean>(false);

    const selectItem = (repos_url: string):void => {
        select(repos_url)
    }
    const listItems: JSX.Element[] = users.map((item) => 
        <div key={item.id} className={itemWrap} onClick={() => selectItem(item.repos_url)}>
            <div className={img}>
                <img src={item.avatar_url} alt={item.login}/>
            </div>
            <p>{item.login}</p>
        </div>
    )

    if ((users.length > 0 && focus) || hover) {
        return (
            <div 
                className={dropdown}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}>
                {listItems}
            </div>
        )
    }
    return null
}

export default Dropdown