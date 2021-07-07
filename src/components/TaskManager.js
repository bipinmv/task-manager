import React, { useState, useEffect } from "react"
import { Container, Form, Button } from "react-bootstrap";
import Task from "./Task";
import { db, timestamp } from "../config/firebase";

const TaskManager = () => {
    const [state, setState] = useState({ input: '', inputErr: '' });
    const [tasks, setTasks] = useState([]);
    const [usersData, setUsersData] = useState([]);

    useEffect(() => {
        db.collection('tasks').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
            const resData = snapshot.docs.map(obj => ({
                id: obj.id,
                data: obj.data()
            }));
            setTasks(resData);
        });
        db.collection('users').onSnapshot(snapshot => {
            const resData = snapshot.docs.map(obj => ({
                data: obj.data()
            }));
            setUsersData(resData);
        })
    }, []);

    const onInputChange = (e) => {
        setState({ ...state, input: e.target.value });
    }

    const addToTask = (e) => {
        e.preventDefault();
        if (state.input === '' || state.input === null) {
            setState({ ...state, inputErr: 'Please enter a task' });
        }
        else {
            setState({ ...state, input: '', inputErr: '' });
            db.collection('tasks').add({
                name: state.input,
                assignee: localStorage.getItem("email"),
                reporter: localStorage.getItem("email"),
                status: 'TO DO',
                comments: '',
                user_id: localStorage.getItem("uid"),
                timestamp: timestamp
            })
        }
    }

    return (
        <Container>
            <Form className="mt-5">
                <Form.Row>
                    <Form.Control type="text"
                        placeholder="Type here to add"
                        value={state.input}
                        onChange={onInputChange}
                        aria-describedby="taskHelpBlock"
                        required
                    />
                    <Form.Text id="taskHelpBlock" className="text-danger ms-3">{state.inputErr}</Form.Text>
                </Form.Row>
                <div className="d-flex justify-content-center">
                    <Button type="submit" onClick={addToTask} size="md" variant="primary" className="text-light mt-3 mb-5">Create Task</Button>
                </div>
            </Form>
            {tasks.map(obj => (
                <Task data={obj.data} id={obj.id} key={obj.id} usersData={usersData} />
            ))}
        </Container>
    )
}

export default TaskManager;
