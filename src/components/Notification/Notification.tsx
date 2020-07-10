import React, {useState, useEffect} from 'react'
import style from './Notification.module.sass'

interface Props {
    error_code: number | null
}
const Notification: React.FC<Props> = (props) => {
    const { wrap, show, hide } = style
    const { error_code } = props

    const [showNotification, setShowNotification] = useState<boolean>(false);

    useEffect(() => {
        if (error_code === 403) {
            setShowNotification(true)
            setTimeout(() => {
                setShowNotification(false)
            }, 2000)
        }
    }, [error_code]);
    return (
        <div className={`${wrap} ${showNotification ? show : hide}`}>
            Превышен лимит скорости. Аутентифицированные запросы получают более высокий предел скорости.
        </div>
    )
}

export default Notification