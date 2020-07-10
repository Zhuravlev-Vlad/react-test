import React from 'react'
import style from './Error.module.sass'

const Error404: React.FC = () => {
    const { code, disc, wrap } = style
    return (
        <div className={wrap}>
            <h1 className={code}>404</h1>
            <p className={disc}>Ничего не найдено</p>
        </div>
    )
}

export default Error404