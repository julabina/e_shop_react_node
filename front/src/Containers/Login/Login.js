import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { decodeToken, isExpired } from 'react-jwt';
import { NavLink, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const Login = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [loginInputs, setLoginInputs] = useState({email: "", password: ""});
    const [signInputs, setSignInputs] = useState({email: "", password: "", cgu: false});
    const [isLogged, setIsLogged] = useState(false);
    const [logErrorMsg, setLogErrorMsg] = useState("");
    const [signErrorMsg, setSignErrorMsg] = useState("");
    const [toggleUserAction, setToggleUserAction] = useState(true);

    useEffect(() => {

        window.scrollTo(0, 0);

        if (localStorage.getItem('token') !== null) {
            let getToken = localStorage.getItem('token');
            let token = JSON.parse(getToken);
            if (token !== null) {
                let decodedToken = decodeToken(token.version);
                let isTokenExpired = isExpired(token.version);
                if (decodedToken.userId !== token.content || isTokenExpired === true) {
                    dispatch ({
                        type: 'DISCONNECT'
                    });
                    localStorage.removeItem('token');
                    return setIsLogged(false);
                };
                dispatch ({
                    type: 'LOG'
                });
                setIsLogged(true);
            } else {
                dispatch ({
                    type: 'DISCONNECT'
                });
                setIsLogged(false);
            };
        } else {
            dispatch ({
                type: 'DISCONNECT'
            });
            setIsLogged(false);
        }; 

    },[]);

    /**
     * VALIDATE LOG INPUTS
     * @param {*} e 
     * @returns 
     */
    const verifyToLog = (e) => {

        if (e !== undefined) {
            e.preventDefault();
        }

        if (loginInputs.email === "" || loginInputs.password === "") {
            return setLogErrorMsg("- Tous les champs sont requis.");
        } 
        if (!loginInputs.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i)) {
            return setLogErrorMsg("- Le format de l'email n'est pas valide.");
        }
        if (!loginInputs.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)) {
            return setLogErrorMsg("- Le mot de passe doit contenir minimun 1 lettre 1 chiffre 1 lettre majuscule et 8 caractères.");
        }

        tryToLog(loginInputs.email, loginInputs.password);
    };

    /**
     * POST TO BACK-END LOGIN INFORMATIONS
     * IF OK BACK-END SEND TOKEN
     * GO TO USER ACCOUNT PAGE
     * @param {*} email 
     * @param {*} password 
     */
    const tryToLog = (email, password) => {

        fetch("https://api-e-commerce.julienlenfume.com/api/users/login", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST', 
            body: JSON.stringify({email: email, password: password})})
                .then(res => res.json())
                .then(data => {
                    if (data.token) {
                        setLogErrorMsg('');
                        let newObj = {
                            version: data.token,
                            content: data.userId
                        };
                        localStorage.setItem('token', JSON.stringify(newObj)); 
                        navigate('/userAccount', { replace: true });
                    } else if (data.message) {
                        setLogErrorMsg(data.message || data.error);
                    }
                })
                .catch(error => setLogErrorMsg(error));
    };

    /**
     * VALIDATE SIGN INPUTS
     * @param {*} e 
     * @returns 
     */
    const verifyToSign = (e) => {

        if (e !== undefined) {
            e.preventDefault();
        }

        if (signInputs.email === "" || signInputs.password === "") {
            return setSignErrorMsg("- Tous les champs sont requis.");
        } 
        if (!signInputs.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i)) {
            return setSignErrorMsg("- Le format de l'email n'est pas valide.");
        }
        if (!signInputs.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)) {
            return setSignErrorMsg("- Le mot de passe doit contenir minimun 1 lettre 1 chiffre 1 lettre majuscule et 8 caractères.");
        }
        if(!signInputs.cgu) {
            return setSignErrorMsg("- Veuillez accepter les Conditions générales d'utilisation.");
        }

        tryToSign(signInputs.email, signInputs.password);
    };

    /**
     * POST SIGNIN INFORMATIONS TO BACK-END
     * IF OK TRY TO LOG
     * @param {*} email 
     * @param {*} password 
     */
    const tryToSign = (email, password) => {

        fetch("https://api-e-commerce.julienlenfume.com/api/users/signup", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST', 
            body: JSON.stringify({email: email, password: password})})
                .then(res => {
                    setSignErrorMsg('');
                    if (res.status === 201) {
                        const newObj = {
                            ...signInputs
                        };
                        setLoginInputs(newObj);
                        setToggleUserAction(!toggleActionUser);
                        return tryToLog(email, password);
                    } 
                    
                    return res.json();
                    
                })
                    .then(data => {
                        return setSignErrorMsg(data.message);    
                    })
                    .catch(error => {
                        return console.error(error);
                    });
    };

    /**
     * CONTROL LOG INPUTS
     * @param {*} action 
     * @param {*} value 
     */
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

    /**
     * CONTROL SIGN INPUTS
     * @param {*} action 
     * @param {*} value 
     */
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

    /**
     * TOGGLE LOG OR SIGN
     */
    const toggleActionUser = () => {
        setToggleUserAction(!toggleUserAction);
    }

    /**
     * CONTROL ACCEPT CGU INPUT
     */
    const toggleCguCheck = () => {
        const newObj = {
            ...signInputs,
            cgu: !signInputs.cgu
        };
        setSignInputs(newObj);
    }
    
    /**
     * DISCONNECTING
     */
    const logOut = () => {
        dispatch ({
            type: 'DISCONNECT'
        });
        localStorage.removeItem('token');
        window.location.reload(false);
    };

    return (
        <>
        <Helmet>
            <title>Se connecter - React optique shop</title>
            <meta name="title" content="Se connecter - React optique shop" />
        </Helmet>
        <main className='login'>
            {
                isLogged ?
                <section className='login__section'>
                    <h2>Vous ete deja connecté</h2>
                    <div className="login__section__almostLogBtn">
                        <NavLink to="/">
                            <button>Accueil</button>
                        </NavLink>
                        <button onClick={logOut}>Se deconnecter</button>
                    </div>
                </section>
                :
                <section className='login__section'>                    
                    {
                        toggleUserAction
                        ?
                        <>
                            <h2>Se connecter</h2>
                            <div className="login__section__logError">{logErrorMsg}</div>
                            <form onSubmit={verifyToLog}>
                                <label htmlFor="logEmail">Email</label>
                                <input className='login__section__input' onInput={(e) => handleLoginInputs("email", e.target.value)} type="email" value={loginInputs.email} id="logEmail" />
                                <label htmlFor="logPassword">Password</label>
                                <input className='login__section__input' onInput={(e) => handleLoginInputs("password", e.target.value)} type="password" value={loginInputs.password} id="logPassword" />
                                <button>Se connecter</button>
                            </form>

                            <p className='login__section__or login__section__or__log'>ou</p>
                            <button onClick={toggleActionUser}>S'Enregistrer</button>
                        </>
                        :
                        <>
                            <h2>S' enregister</h2>
                            <div className="login__section__signError">{signErrorMsg}</div>
                            <form onSubmit={verifyToSign}>
                                <label htmlFor="signEmail">Email</label>
                                <input className='login__section__input' onInput={(e) => handleSignInputs("email", e.target.value)} type="email" value={signInputs.email} id="signEmail" />
                                <label htmlFor="signPassword">Password</label>
                                <input className='login__section__input' onInput={(e) => handleSignInputs("password", e.target.value)} type="password" value={signInputs.password} id="signPassword" />
                                <div className="login__section__cgu">
                                    <input onChange={toggleCguCheck} type="checkbox" name='cguInput' id="cguAccept" checked={signInputs.cgu} />
                                    <label htmlFor="cguAccept">J'ai lu et j'accepte la <NavLink className="login__section__cgu__link" to="/cgu">CGU</NavLink>.</label>
                                </div>
                                <button>S'enregistrer</button>
                            </form>

                            <p className='login__section__or'>ou</p>
                            <button onClick={toggleActionUser}>Se connecter</button>
                        </>
                    }
                </section>
            }
        </main>
        </>
    );
};

export default Login;