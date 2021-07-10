import React from 'react'
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Route, NavLink, Switch } from 'react-router-dom';
import TaskManager from "./TaskManager";
import Login from "./Login";
import { auth } from "../config/firebase";
import { useHistory } from "react-router-dom";

const CustomNavbar = () => {
    const token = localStorage.getItem("uid");
    const email = localStorage.getItem("email");
    const history = useHistory();

    const logoutHandler = () => {
        console.log("from nav", token)
        auth.signOut().then(() => {
            localStorage.clear();
            history.go(0);
        }).catch((error) => {
            console.log({ error })
        });
    }
    return (
        <>
            <Navbar collapseOnSelect expand="lg" variant="dark" bg="primary" sticky="top">
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Brand >
                    <Nav.Link as={NavLink} to="/">
                        <strong className="brand">Task Manager</strong>
                    </Nav.Link>
                </Navbar.Brand>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto me-lg-4">
                        {token &&
                            <>
                                <span className="text-light me-3 mt-1">{email}</span>
                                <Button className="" variant="dark" size="sm" onClick={logoutHandler}>Log out</Button>
                            </>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Switch>
                <Route path="/" exact >
                    {token ? <TaskManager />
                        : <Login />}
                </Route>
                <Route path="/login" exact >
                    {token ? <TaskManager />
                        : <Login />}
                </Route>
            </Switch>
        </>
    )
}

export default CustomNavbar;