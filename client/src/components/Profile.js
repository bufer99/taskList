import { selectCurrentUser, logout, setCredentials, selectCurrentToken } from '../state/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import { default as logo } from '../media/profile.svg';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import { default as logIcon } from '../media/logout.png'
import {
    useGetTaskListsQuery,
} from '../state/taskApiSlice';
import { Loading } from './Loading';
import styles from '../styles/Profile.module.css'
import { useEffect } from 'react';

export const Profile = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector(selectCurrentUser);

    useEffect(() => {
        if (!user) {
            navigate('/')
        }
    }, [])

    const token = useSelector(selectCurrentToken);
    const { data, error, isLoading } = useGetTaskListsQuery();

    if (isLoading || !data) {
        return <Loading />;
    }

    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.userProfile}>
                    <div className={styles.logo}>
                        <img src={logo}></img>
                    </div>
                    <div className={styles.content}>
                        <div className={styles.aspects}>
                            <div>Név:</div>
                            <div>Email:</div>
                            <div>Feladatsorok:</div>
                        </div>
                        <div className={styles.data}>
                            <div>{user?.fullname}</div>
                            <div>{user?.email}</div>
                            <div>{isLoading ? '...' : `${data.total} db`} </div>
                        </div>
                        <div className={styles.btn}>
                            <Link onClick={dispatch(logout)} to="/">
                                <div className={styles.btnContent}>
                                    <p>Kijelentkezés</p>
                                    <img src={logIcon}></img>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

/***navigate('/login') */