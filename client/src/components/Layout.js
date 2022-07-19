import { Outlet, Link, useLocation } from "react-router-dom";
import styles from '../styles/Nav.module.css'
import { selectCurrentUser, logout } from '../state/authSlice';
import { getEditedTask } from "../state/taskSlice";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames/bind";
import { PhoneMenu } from "./PhoneMenu";
import { useState, useEffect } from "react";
let cn = classNames.bind(styles)

export const Layout = () => {

  const dispatch = useDispatch();

  const { pathname } = useLocation();

  const user = useSelector(selectCurrentUser);
  const editedTask = useSelector(getEditedTask);

  const [sideMenu, setSideMenu] = useState(false);

  const closeMenu = (e) => {
    if (e.target.closest('#burgerMenu') === null) setSideMenu(false);
  }

  useEffect(() => {
    document.addEventListener('click', closeMenu);
    return () => { document.removeEventListener('click', closeMenu); }
  }, [])

  const toggleMenu = () => {
    setSideMenu(!sideMenu);
  }

  return (
    <div style={{display: "flex", flexDirection: "column"}}>
      <nav className={styles.sticky}>
        <PhoneMenu user={user} id="phoneMenu" open={sideMenu} />
        <div className={styles.navContent}>
          <div className={cn({
            link: true,
            home: true,
          })}>
            <Link to="/">Feladatsorok alkalmazás</Link>
          </div>
          <div className={cn({
            activeTab: pathname === "/task-bank",
            link: true
          })}>
            <Link to="/task-bank">Feladatbank</Link>
          </div>

          {user ?
            <>
              <div className={cn({
                activeTab: pathname === "/my-tasks",
                link: true
              })}>
                <Link to="/my-tasks">Feladatsoraim</Link>
              </div>
              <div className={cn({
                activeTab: pathname === "/edited-task" && editedTask !== null,
                disabled: editedTask === null,
                link: true
              })}>
                <Link to="/edited-task">Szerkesztett feladatsor</Link>
              </div>
              <div className={cn({
                activeTab: pathname === "/profile",
                link: true
              })}>
                <Link to="/profile">Profil</Link>
              </div>
              <div className={styles.link}>
                <Link onClick={dispatch(logout)} to="/">Kijelentkezés</Link>
              </div>
            </> : <>
              <div className={cn({
                activeTab: pathname === "/login",
                link: true
              })}>
                <Link to="/login">Bejelentkezés</Link>
              </div>
              <div className={cn({
                activeTab: pathname === "/registration",
                link: true
              })}>
                <Link to="/registration">Regisztráció</Link>
              </div>
            </>
          }
          <div id="burgerMenu" className={styles.burgerMenu} onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>

      <Outlet />
    </div>
  )
};
