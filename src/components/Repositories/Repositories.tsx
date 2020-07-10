import React, {useState, useEffect} from 'react'
import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import actionChangeSearchQwery from './../../redux/actions/changeSearch'

import style from './Repositories.module.sass'

import { State, Result } from './../../constants/types'

import Pagination from './../../components/Pagination/Pagination'

type Props = {
    result: Result
    changeSearch(value: string, page: number): void
    search_qwery: string | null
}

const Repositories: React.FC<Props> = (props) => {
    const [resetPagination, setResetPagination] = useState<boolean>(false);
    const { result, search_qwery, changeSearch } = props
    const { repositories, total_count } = result
    const { 
        itemWrap, 
        repositoryInfo,
        repositoryName, 
        repositoryDescription, 
        repositoryLanguage, 
        resultWrap,
        owner,
        ownerImg,
        ownerLogin,
        btn
    } = style

    const listItems: JSX.Element[] = repositories.map((item) => 
        <div key={item.id} className={itemWrap}>
            <div className={owner}>
                <img src={item.owner.avatar_url} alt={item.owner.login} className={ownerImg}/>
                <p className={ownerLogin}>{item.owner.login}</p>
            </div>
            <div className={repositoryInfo}>
                <a href={item.homepage} className={repositoryName} target="_blank" rel="noopener noreferrer">
                    {item.name}
                </a>
                <p className={repositoryDescription}>{item.description}</p>
                <p className={repositoryLanguage}>{item.language}</p>
            </div>
            <Link to={`/issues/${item.owner.login}/${item.name}`} className={`${btn} btn`}>Перейти</Link>
        </div>
    )

    const onPageChanged = (page: number):void => {
        changeSearch(search_qwery!, page)
    }

    useEffect(() => {
        setResetPagination((prev) => !prev)
    }, [search_qwery]);

    return (
        <>
            <div className={resultWrap}>
                {listItems}
            </div>
            <Pagination totalRecords={total_count! > 1000 ? 1000 : total_count} pageLimit={10} pageNeighbours={1} onPageChanged={onPageChanged} reset={resetPagination}/>
        </>
    )
}

const putStateToProps = (state: State) => {
    const { result, search_qwery } = state.searchReducer
    return {
      result,
      search_qwery
    }
}

const putActionsToProps = (dispatch: Dispatch) => {
    return {
        changeSearch: bindActionCreators(actionChangeSearchQwery, dispatch)
    }
}

export default connect(putStateToProps, putActionsToProps)(Repositories)