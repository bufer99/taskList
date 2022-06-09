import { default as loadingIcon } from '../media/refresh.png';
import styles from '../styles/Loading.module.css'

export const Loading = () => {

    return (

        <div className={styles.wrapper}>
            <img className={styles.rotate} src={loadingIcon}></img>
        </div>
    )
}
