import React, { useEffect, useState } from 'react'
import style from './Issue.module.sass'
import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import { State, listIssue, Comments } from './../../constants/types'
import { actionGetComments, actionPushComments, actionGetIssue } from './../../redux/actions/changeSearch'

import Back from './../../components/Back/Back'

import { options } from './../../constants/dateOptions'

import Comment from './../../components/Comment/Comment'

interface RouteInfo {
    owner: string
    repo: string
    issue_number: string
}
interface Props {
    getIssue(owner: string, repo: string, issue_number: string): void
    getComments(owner: string, repo: string, issue_number: string, page: number): void
    pushComments(owner: string, repo: string, issue_number: string, page: number): void
    issue: listIssue
    comments: Comments
}
interface ComponentProps extends RouteComponentProps<RouteInfo>, Props {}


const Issue: React.FC<ComponentProps> = (props) => {
    const { issueTitle, issueDesc, issueState } = style
    const { getIssue, getComments, pushComments, issue, comments } = props
    const { title, number, state, user, created_at, body } = issue
    const { owner, repo, issue_number } = props.match.params
    const [page, setPage] = useState<number>(2);
    useEffect(() => {
        getIssue(owner, repo, issue_number)
        getComments(owner, repo, issue_number, 1)
    }, [getIssue, getComments, owner, repo, issue_number]);

    const listComments: JSX.Element[] = comments.map((item) => 
        <Comment key={item.id} user={item.user} body={item.body} created_at={item.created_at}/>
    )

    const loadComments = () => {
        pushComments(owner, repo, issue_number, page)
        setPage((prev) => ++prev)
    }

    if (user) {
        return (
            <div>
                <Back/>
                <h1 className={issueTitle}>{title} <span>#{number}</span></h1>
                <div className={issueDesc}>
                    <span className={issueState} style={{backgroundColor: state === "open" ? '#28a745' : 'red'}}>{state}</span>
                    {
                        user && <a href={user.html_url} target="_blank" rel="noopener noreferrer">{user.login}</a>
                    }
                    <span>вопрос открыт {new Date(created_at).toLocaleString("ru", options)}</span>
                </div>
                {
                    user &&
                    <Comment user={user} body={body} created_at={created_at}/>
                }
                {listComments}
                <button onClick={loadComments} className="btn btn-load">Показать еще</button>
            </div>
        )
    } else
        return null
}

const putStateToProps = (state: State) => {
    const { issue, comments } = state.searchReducer
    return {
        issue,
        comments
    }
}

const putActionsToProps = (dispatch: Dispatch) => {
    return {
        getIssue: bindActionCreators(actionGetIssue, dispatch),
        getComments: bindActionCreators(actionGetComments, dispatch),
        pushComments: bindActionCreators(actionPushComments, dispatch),
    }
}

export default connect(putStateToProps, putActionsToProps)(Issue)