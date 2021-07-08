import React, { useState } from 'react'
import { Form, Button } from "react-bootstrap";
import { db } from "../config/firebase";

function Task({ id, data, usersData }) {

    const [isDisabled, setIsDisabled] = useState(true);

    const setStatusColor = (status) => {
        if (status.toLowerCase() === 'done') {
            return "text-success";
        }
        else if (status.toLowerCase() === 'to do') {
            return "text-danger";
        }
        else {
            return "text-warning"
        }
    }

    const handleStatus = (e) => {
        db.collection('tasks').doc(id).update({ status: e.target.value });
    }

    const handleAssignee = (e) => {
        db.collection('tasks').doc(id).update({ assignee: e.target.value });
    }

    const handleEditComment = (e) => {
        db.collection('tasks').doc(id).update({ comments: e.target.value });
    }

    const delTask = (e) => {
        db.collection('tasks').doc(id).delete();
    }

    const userNameDropdown = usersData.map((obj, i) => <option key={i} value={obj.data.email}>{obj.data.email}</option>);

    return (
        <div key={id} className="shadow w-100 h-25 mt-3 mb-4 p-3 position-relative">
            <h4>{data.name}</h4>
            <div className="task-details mt-4">
                <div className="d-inline-flex"><span className="mt-2 text-secondary">Assignee:</span>
                    <Form.Group controlId="formGridUser" className="ms-3 ">
                        <Form.Control as="select" value={data.assignee} onChange={handleAssignee}>
                            {userNameDropdown}
                        </Form.Control>
                    </Form.Group>
                </div>
                <div className="mt-2"><span className="text-secondary">Reporter:</span><span className="ms-2">{data.reporter}</span></div>
                <Form.Group controlId="formGridState" className="mt-3 mt-lg-0">
                    <Form.Control as="select" defaultValue={data.status} className={setStatusColor(data.status)} onChange={handleStatus}>
                        <option className={setStatusColor("to do")} value="TO DO">TO DO</option>
                        <option className={setStatusColor("in progress")} value="IN PROGRESS">IN PROGRESS</option>
                        <option className={setStatusColor("done")} value="DONE">DONE</option>
                    </Form.Control>
                </Form.Group>
            </div>
            <div className="my-3">
                <span className="text-secondary">Comments:</span>
                <Form.Control type="text"
                    placeholder={data.comments}
                    value={data.comments}
                    onChange={handleEditComment}
                    onClick={() => setIsDisabled(!isDisabled)}
                    readOnly={isDisabled}
                    title={"click here to add comment"}
                />
            </div>
            <Button variant="danger" className="del-btn py-0 px-1" size="sm" title="Remove" onClick={delTask}>x</Button>
        </div>
    )
}

export default Task;
