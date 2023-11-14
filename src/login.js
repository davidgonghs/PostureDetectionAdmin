import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";



const Login = (props) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState("")

    const navigate = useNavigate();
    const onButtonClick = () => {
        console.log('username:', username)

        // Set initial error values to empty
        //   setUsernameError("")
        setPasswordError("")

        // Check if the user has entered both fields correctly
        // if ("" === username) {
        //     setUsernameError("Please enter your email")
        //     return
        // }
        //
        // if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        //     setUsernameError("Please enter a valid email")
        //     return
        // }

        if ("" === password) {
            setPasswordError("Please enter a password")
            return
        }

        if (password.length < 8) {
            setPasswordError("The password must be 8 characters or longer")
            return
        }

        login()
    }


    const login = () => {
        console.log("login",apiUrl+'/auth/login')
        fetch(apiUrl+'/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        })
            .then(r => r.json())
            .then(r => {
                if (r.status === 200) {
                   // localStorage.setItem("user", JSON.stringify({username, token: r.token}))
                    //get user id
                    localStorage.setItem("username",  username)
                    localStorage.setItem("token", r.data.accessToken)
                    localStorage.setItem("user_id",r.data.id)
                    console.log("r.", r)
                    props.setLoggedIn(true)
                    props.setUsername(username)
                    navigate("/")
                } else {
                    // Handle login failure
                    console.error('Login failed:', r.message);
                    window.alert("Wrong username or password")
                }
            })
    }

    return (
        <div className="login-page">
            <div className="login-box">
                <div className="card card-outline card-primary">
                    <div className="card-header text-center">
                        <b>Posture</b>Detection
                    </div>
                    <div className="card-body">
                        <p className="login-box-msg">Sign in to start your session</p>
                        <div className="input-group mb-3">
                            <input type="username" className="form-control" value={username}
                                   onChange={(e) => setUsername(e.target.value)} placeholder="Username"/>
                            <div className="input-group-append">
                                <div className="input-group-text">
                                    <span className="fas fa-user"/>
                                </div>
                            </div>
                        </div>
                        <div className="input-group mb-3">
                            <input type="password" className="form-control" value={password}
                                   onChange={(e) => setPassword(e.target.value)} placeholder="Password"/>
                            <div className="input-group-append">
                                <div className="input-group-text">
                                    <span className="fas fa-lock"/>
                                </div>
                            </div>

                            <label className="errorLabel" style={{ color: 'red' }}>{passwordError}</label>
                        </div>
                        <div className="row">
                            <div className="col-8">
                                <div className="icheck-primary">
                                    <input type="checkbox" id="remember"/>
                                    <label htmlFor="remember">Remember Me</label>
                                </div>
                            </div>
                            <div className="col-4">
                                <button type="button" className="btn btn-primary btn-block"
                                        onClick={onButtonClick}>Login
                                </button>
                            </div>
                            {/* /.col */}
                        </div>

                    </div>
                    {/* /.card-body */}
                </div>
                {/* /.card */}
            </div>
            {/* /.login-box */}
        </div>

    );
}
export default Login;
