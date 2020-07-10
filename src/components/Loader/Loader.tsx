import React from 'react'
import style from './Loader.module.sass'
import { connect } from 'react-redux'
import { State } from './../../constants/types'

interface Props {
    loading: boolean
}

const Loader: React.FC<Props> = (props) => {
    const { loading } = props
    const { linearActivity, indeterminate } = style

    if (loading) {
        return (
            <div className={linearActivity}>
                <div className={indeterminate} />
            </div>
        )
    }
    return null
}

const putStateToProps = (state: State) => {
    const {loading} = state.searchReducer
    return {
        loading
    }
}

export default connect(putStateToProps)(Loader)