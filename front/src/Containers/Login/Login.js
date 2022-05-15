import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate();

    const [loginInputs, setLoginInputs] = useState({email: "", password: ""});
    const [signInputs, setSignInputs] = useState({email: "", password: ""});
    const [logged, setLogged] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [toggleUserAction, setToggleUserAction] = useState(true);

    const tryToLog = (e) => {
        e.preventDefault();
        fetch("http://localhost:3000/api/users/login", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST', 
            body: JSON.stringify({email: loginInputs.email, password: loginInputs.password})})
                .then(res => res.json())
                .then(data => {
                    if (data.token) {
                        setErrorMsg('');
                        let newObg = {
                            version: data.token,
                            content: data.userId
                        }
                        localStorage.setItem('token', JSON.stringify(newObg)); 
                        navigate('/userAccount', { replace: true })
                    } else if (data.message) {
                        setErrorMsg(data.message || data.error);
                    }
                })
                .catch(error => console.error(error));
    }

    const tryToSign = (e) => {
        e.preventDefault();
    }

    const handleLoginInputs = (action, value) => {
        if (action === "email") {
            const newObj = {
                ...loginInputs,
                email: value
            };
            setLoginInputs(newObj);
        } else if (action === "password") {
            const newObj = {
                ...loginInputs,
                password: value
            };
            setLoginInputs(newObj);
        }
    }

    const handleSignInputs = (action, value) => {
        if (action === "email") {
            const newObj = {
                ...signInputs,
                email: value
            };
            setSignInputs(newObj);
        } else if (action === "password") {
            const newObj = {
                ...signInputs,
                password: value
            };
            setSignInputs(newObj);
        }
    }

    const toggleActionUser = () => {
        setToggleUserAction(!toggleUserAction);
    }

    return (
        <main>
            <section className='login__section'>
                <div className="login__section__errorCont"><p className="login__section__errorCont__error">{errorMsg}</p></div>
                
                {
                    toggleUserAction
                    ?
                    <>
                        <h2>Se Connecter</h2>
                        <form onSubmit={tryToLog}>
                            <label htmlFor="">Email</label>
                            <input onInput={(e) => handleLoginInputs("email", e.target.value)} type="email" name="" value={loginInputs.email} id="" />
                            <label htmlFor="">password</label>
                            <input onInput={(e) => handleLoginInputs("password", e.target.value)} type="password" name="" value={loginInputs.password} id="" />
                            <button>Se connecter</button>
                        </form>

                        <p>ou</p>
                        <button onClick={toggleActionUser}>S'enregistrer</button>
                    </>
                    :
                    <>
                        <h2>S' enregister</h2>
                        <form onSubmit={tryToSign}>
                            <label htmlFor="">Email</label>
                            <input onInput={(e) => handleSignInputs("email", e.target.value)} type="email" name="" value={signInputs.email} id="" />
                            <label htmlFor="">password</label>
                            <input onInput={(e) => handleSignInputs("password", e.target.value)} type="password" name="" value={signInputs.password} id="" />
                            <button>Se connecter</button>
                        </form>

                        <p>ou</p>
                        <button onClick={toggleActionUser}>Se connecter</button>
                    </>
                }
            </section>
        </main>
    );
};

export default Login;