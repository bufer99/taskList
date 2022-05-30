import { TextField, Button } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useLoginMutation } from "../state/authApiSlice";
import { selectCurrentUser } from '../state/authSlice';
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../state/authSlice";
import { useNavigate } from 'react-router-dom';
import { default as profile } from '../media/user.png'
import styles from '../styles/Login.module.css';

export const Login = () => {
    const dispatch = useDispatch();

    const [loginFn] = useLoginMutation();

    const navigate = useNavigate();
    const emailRef = useRef();
    const passwordRef = useRef();

    const [error, setError] = useState(false);
    const [values, setValues] = useState({ email: "", password: "" });
    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value })
        setError(false)
    }

    const user = useSelector(selectCurrentUser);

    useEffect(() => {
        console.log(user)
    },[])

    const { email, password } = values;

    return (
        <>
            <div className={styles.formWrapper}>
                <div className={styles.user}>
                    <img className={styles.img} src={profile} ></img>
                </div>
                <form>
                    <TextField
                        error={error}
                        ref={emailRef}
                        id="email"
                        name="email"
                        value={email}
                        onChange={handleChange}
                        label="email"
                        variant="filled"
                        helperText={error && 'hibás email cím'}
                        sx={{ input: { background: 'white' } }}
                    />
                    <TextField
                        error={error}
                        ref={passwordRef}
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={handleChange}
                        label="Jelszó"
                        variant="filled"
                        helperText={error && 'hibás jelszó'}
                        sx={{ input: { background: 'white' } }}
                    />
                    <Button variant="contained" onClick={async () => {
                        try {
                            const result = await loginFn({ strategy: 'local', email: email, password: password });
                            if (result.data) {
                                console.log(result.data);
                                dispatch(setCredentials(result.data));
                                
                                console.log(result.data);
                                navigate("/task-bank")
                            } else {
                                setError(true)
                            }
                        } catch (err) {
                            console.log("err");
                        }
                    }}>
                        Bejelentkezés
                    </Button>
                </form>
            </div>
        </>

    )
}