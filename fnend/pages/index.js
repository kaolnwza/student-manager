import React, { useState, SyntheticEvent } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';


const login = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const submit = async (e) => {
        e.preventDefault()

        await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            credentials: 'include',

            body: JSON.stringify({
                username: username,
                password: password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        // const json = await res.json()
        // console.log(json);

    }


    return (<Row style={{ width: '60%' }}>
        <Col className='d-flex  align-items-start'>
            <h1 className='display-4'>Student<br /> Management</h1>
        </Col>
        <Col>
            <Form onSubmit={submit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address  {username}</Form.Label>
                    <Form.Control type="text" placeholder="Enter email" className='w-100' required
                        onChange={(e) => setUsername(e.target.value)}
                    />

                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password {password}</Form.Label>
                    <Form.Control type="password" placeholder="Password" required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Col>
    </Row>);
}

export default login;