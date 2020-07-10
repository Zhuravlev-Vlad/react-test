import React from 'react'
import style from './Comment.module.sass'
import { options } from './../../constants/dateOptions'

interface Props {
    user: any
    body: string
    created_at: string
}
const Comment: React.FC<Props> = (props) => {
    const { 
        commentWrap,
        commentAvatar,
        commentContent,
        commentHeader,
        commentBody
     } = style
    const { user, created_at, body } = props
    return (
        <div className={commentWrap}>
            <a href={user.html_url} className={commentAvatar}>
                <img src={user.avatar_url} alt=""/>
            </a>
            <div className={commentContent}>
                <div className={commentHeader}>
                    <a href={user.html_url} target="_blank" rel="noopener noreferrer">{user.login}</a>
                    <p>{new Date(created_at).toLocaleString("ru", options)}</p>
                </div>
                <div className={commentBody}>{body}</div>
            </div>
        </div>
    )
}

export default Comment