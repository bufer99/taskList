import styles from '../styles/NoMatch.module.css'

export const NoMatch = () => {
    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.content}>
                    <div className={styles.errCode}>404</div>
                    <div className={styles.errText}>Az oldal nem található</div>
                </div>
            </div>
        </>
    )
}