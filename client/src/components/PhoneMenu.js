import { Outlet, Link, useLocation } from "react-router-dom";
import styles from '../styles/Nav.module.css'
import { selectCurrentUser, logout } from '../state/authSlice';
import { getEditedTask } from "../state/taskSlice";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames/bind";
let cn = classNames.bind(styles)

export const PhoneMenu = (prop) => {

    const { open, id, user } = prop;

    console.log("opened", open)
    return (
        <div id={id} className={cn({
            sideMenu: true,
            activeMenu: open,
        })}>
            <div className={styles.sideMenuContent}>
                <Link to="/task-bank">Feladatbank</Link>
                <Link to="/login">Bejelentkezés</Link>
                <Link to="/registration">Regisztráció</Link>
                {user && <>
                    <Link to="/my-tasks">Feladatsoraim</Link>
                    <Link to="/edited-task">Szerkesztett feladatsor</Link>
                    <Link to="/profile">Profil</Link>
                </>}
            </div>
        </div>
    )
}