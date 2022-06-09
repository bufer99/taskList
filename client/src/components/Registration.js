import { TextField, Button } from '@mui/material';
import { useRef, useState } from 'react';
import { useRegisterMutation } from "../state/authApiSlice";
import { useNavigate } from 'react-router-dom';
import { default as profile } from '../media/user.svg'
import styles from '../styles/Login.module.css';

export const Registration = () => {

    const navigate = useNavigate();
    const [registerFn] = useRegisterMutation();

    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const [errors, setErrors] = useState({ username: false, email: false, password: false });
    const [values, setValues] = useState({ username: "", email: "", password: "" });
    const handleChange = (event) =>
        setValues({ ...values, [event.target.name]: event.target.value });

    const { username, email, password } = values;

    return (
        <>
            <div className={styles.formWrapper}>
                <div className={styles.user}>
                    <img src={profile} ></img>
                </div>
                <form>
                    <TextField
                        error={errors.username}
                        ref={usernameRef}
                        id="username"
                        name="username"
                        value={username}
                        onChange={handleChange}
                        label="teljes név"
                        variant="filled"
                        sx={{ input: { background: 'white' } }}
                    />
                    <TextField
                        error={errors.email}
                        ref={emailRef}
                        id="email"
                        name="email"
                        value={email}
                        onChange={handleChange}
                        label="email cím"
                        variant="filled"
                        sx={{ input: { background: 'white' } }}
                    />
                    <TextField
                        error={errors.password}
                        ref={passwordRef}
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={handleChange}
                        label="jelszó "
                        variant="filled"
                        sx={{ input: { background: 'white' } }}
                    />
                    <Button variant="contained" onClick={() => {

                        setErrors({
                            username: username === "",
                            email: !/.+@.+\..+/.test(email),
                            password: password === ""
                        });

                        if (username !== "" && /.+@.+\..+/.test(email) && password !== "") {
                            registerFn({ email: email, password: password, fullname: username }).then(() => navigate("/login"))
                        }
                    }}>
                        Regisztráció
                    </Button>
                </form>
            </div>
        </>

    )
}