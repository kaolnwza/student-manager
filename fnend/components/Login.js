import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import React, { useState, useContext } from 'react';
import UserContext from "../context/state";
import { useRouter } from 'next/router'


const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const rounter = useRouter()

    const submit = async (e) => {
        e.preventDefault()
        console.log(process.env.ip);
        const res = await fetch(`http://${process.env.ip}:3000/auth/login`, {
            method: 'POST',
            // credentials: 'include',
            body: JSON.stringify({
                username,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        })
        const json = await res.json()
        if (json == 'User not found') {
            alert("try Again")
            setUsername('')
            setPassword('')
        } else {
            if (typeof window !== 'undefined') {
                console.log(json)
                // setToken(json)
                window.localStorage.setItem('token', json)
                rounter.push('/home')

            }
        }

    }
    return (
        <Form onSubmit={submit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address </Form.Label>
                <Form.Control type="text" placeholder="Enter email" className='w-100' required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password </Form.Label>
                <Form.Control type="text" placeholder="Password" required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Form.Group>
            <Button variant="primary" type="submit" >
                Submit
            </Button>
        </Form>
    );
}

export default Login;