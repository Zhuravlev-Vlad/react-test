import React, { useEffect, useState } from 'react'
import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import style from './Issues.module.sass'
import { State, listIssues } from './../../constants/types'
import { actionGetIssues, actionPushIssues } from './../../redux/actions/changeSearch'
import CommentIcon from './../../images/comment.svg'
import { options } from './../../constants/dateOptions'

import Back from './../../components/Back/Back'

interface RouteInfo {
    owner: string
    repo: string
}
interface Props {
    getIssues(owner: string, repo: string, page: number): void
    pushIssues(owner: string, repo: string, page: number): void
    issues: listIssues,
    loading: boolean
}
interface ComponentProps extends RouteComponentProps<RouteInfo>, Props {}

const Issues: React.FC<ComponentProps> = (props) => {
    const { getIssues, pushIssues, issues, loading, history } = props
    const { owner, repo } = props.match.params
    const [page, setPage] = useState<number>(2);
    const { 
        issuesWrap, 
        issuesTitle, 
        issuesCreatedAt, 
        issuesNumber, 
        issuesCommentsCount,
        tag,
        noResult
    } = style

    useEffect(() => {
        getIssues(owner, repo, 1)
    }, [owner, repo, getIssues]);

    const getColorByBgColor = (bgColor: string): string => {
        if (!bgColor) { return ''; }
        return (parseInt(bgColor.replace('#', ''), 16) > 0xffffff / 2) ? '#000' : '#fff';
    }

    const loadIssues = () => {
        pushIssues(owner, repo, page)
        setPage((prev) => ++prev)
    }
    
    const listItems: JSX.Element[] = issues.map((item) => {
        const { id, title, created_at, number, labels, comments } = item
        const tags: JSX.Element[] = labels.map((item) => 
            <span key={item.id} className={tag} style={{backgroundColor: `#${item.color}`, color: getColorByBgColor(item.color)}}>
                {item.name}
            </span>
        )

        return (
            <div key={id} className={issuesWrap} onClick={() => history.push(`/issues/${owner}/${repo}/${number}`)}>
                <div>
                    <p className={issuesTitle}>{title} {tags}</p>
                    <p>
                        <span className={issuesNumber}>#{number}</span>
                        <span className={issuesCreatedAt}>
                            открыто {new Date(created_at).toLocaleString("ru", options)}
                        </span>
                    </p>
                </div>
                <div className={issuesCommentsCount}>
                    <img src={CommentIcon} alt=""/>
                    {comments}
                </div>
            </div>
        )
    })

    if (issues.length === 0 && !loading) {
        return (
            <>
                <Back/>
                <div className={noResult}>
                    Нет результатов
                </div>
            </>
        )
    }
    return (
        <div>
            <Back/>
            {listItems}
            <button onClick={loadIssues} className="btn btn-load">Показать еще</button>
        </div>
    )
}

const putStateToProps = (state: State) => {
    const { issues, loading } = state.searchReducer
    return {
        issues,
        loading
    }
}

const putActionsToProps = (dispatch: Dispatch) => {
    return {
        getIssues: bindActionCreators(actionGetIssues, dispatch),
        pushIssues: bindActionCreators(actionPushIssues, dispatch)
    }
}

export default connect(putStateToProps, putActionsToProps)(Issues)