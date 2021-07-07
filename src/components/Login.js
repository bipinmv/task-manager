import React, { useState } from "react";
import { db, auth } from "../config/firebase";
import { Form, Button, Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";

function Login() {
    const [state, setState] = useState({ user: '', email: '', passowrd: '' });
    const [err, setErr] = useState({ emailErr: '', passwordErr: '' });
    const [hasAccount, setHasAccount] = useState(false);
    const history = useHistory();

    const handleLogin = (e) => {
        e.preventDefault();
        if (state.email === null || state.email === "") {
            setErr({ ...err, emailErr: "Please enter email" });
        }
        else if (state.password === null || state.password === "") {
            setErr({ ...err, emailErr: "Please enter password" });
        }
        else {
            auth.signInWithEmailAndPassword(state.email, state.password)
                .then((userCredential) => {
                    localStorage.setItem("uid", userCredential.user.uid);
                    localStorage.setItem("email", userCredential.user.email);
                    history.go(0);
                })
                .catch((error) => {
                    setErr({ ...err, emailErr: error.message });
                });
        }
    }

    const handleSignUP = () => {
        if (state.email === null || state.email === "") {
            setErr({ ...err, emailErr: "Please enter email" });
        }
        else if (state.password === null || state.password === "") {
            setErr({ ...err, emailErr: "Please enter password" });
        }
        else {
            auth.createUserWithEmailAndPassword(state.email, state.password)
                .then(userCredential => {
                    return db.collection('users').doc(userCredential.user.uid).set({ email: state.email });
                })
                .then(() => {
                    localStorage.setItem("uid", auth.currentUser.uid);
                    localStorage.setItem("email", auth.currentUser.email);
                    history.go(0);
                })
                .catch((error) => {
                    setErr({ ...err, emailErr: error.message });
                });
        }
    }

    const handleInputChange = (e, prop) => {
        if (prop === "email") {
            setState({ ...state, email: e.target.value })
        }
        else if (prop === "password") {
            setState({ ...state, password: e.target.value })
        }
    }

    return (
        <Container className="login-container">
            <div className="shadow mt-5 p-4 rounded col-xs-12 col-md-4">
                <h3 className="text-center mb-4">Login or Sign up</h3>
                <Form>
                    <Form.Group controlId="formPlaintextEmail">
                        <Form.Label column>Email</Form.Label>
                        <Form.Control type="email"
                            placeholder="Email"
                            value={state.email}
                            onChange={e => handleInputChange(e, "email")}
                            aria-describedby="email"
                        />
                    </Form.Group>
                    <Form.Text id="email" className="text-danger ms-3">{err.emailErr}</Form.Text>

                    <Form.Group controlId="formPlaintextPassword">
                        <Form.Label column>Password</Form.Label>
                        <Form.Control type="password"
                            placeholder="Password"
                            value={state.password}
                            onChange={e => handleInputChange(e, "password")}
                            aria-describedby="password"
                        />
                    </Form.Group>
                    <Form.Text id="password" className="text-danger ms-3">{err.passwordErr}</Form.Text>

                    <div className="d-flex justify-content-center flex-column">
                        {
                            hasAccount ? (
                                <>
                                    <Button onClick={handleSignUP} size="md" variant="primary" className="text-light my-3">SIGN UP</Button>
                                    <p className="text-center">Already have an account ? <span className="text-primary cursor-pointer ms-2" onClick={() => setHasAccount(!hasAccount)}>Login</span></p>
                                </>
                            ) : (
                                <>
                                    <Button onClick={handleLogin} type="submit" size="md" variant="primary" className="text-light my-3">LOG IN</Button>
                                    <p className="text-center">Don't have an account ? <span className="text-primary cursor-pointer ms-2" onClick={() => setHasAccount(!hasAccount)}>Sign up</span></p>
                                </>
                            )
                        }
                    </div>
                </Form>
            </div>
        </Container>
    )
}

export default Login
