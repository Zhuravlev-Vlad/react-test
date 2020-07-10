import React from 'react'
import style from './Back.module.sass'
import { useHistory } from "react-router-dom"

interface Props {
}
const Back: React.FC<Props> = (props) => {
    let history = useHistory();
    const { wrap } = style

    return (
        <div className={wrap} onClick={() => history.goBack()}>
            <svg width="24" height="24" viewBox="0 0 24 24">
                <path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z" />
            </svg>
        </div>
    )
}

export default Back