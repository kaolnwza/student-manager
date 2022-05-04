import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import Link from "next/link";

const login = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [token, setToken] = useState(false)

    const rounter = useRouter()

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setToken(window.localStorage.getItem('token'))
        }
    }, [])


    const submit = async (e) => {
        e.preventDefault()
        // rounter.push('/home')
        console.log(process.env.ip);
        const res = await fetch(`http://${process.env.ip}:3000/auth/login`, {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({
                username,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        })
        const json = await res.json()
        if (typeof window !== 'undefined') {
            console.log(json)
            setToken(json)
            window.localStorage.setItem('token', json)
        }

    }

    const role = async (e) => {
        e.preventDefault()

        const res = await fetch('http://localhost:3000/auth/role', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${token}`
            }
        })
        const json = await res.json()
        console.log(json);

    }

    if (token) {

        return <>
            <h1 className='display-1'>You Already Login</h1><br />
            <Link href="/home" >
                < lord-icon
                    src="https://cdn.lordicon.com/iifryyua.json"
                    trigger="morph"
                    style={{ width: '3rem', height: '3rem', cursor: 'pointer' }}>
                    Back


                </lord-icon>
            </Link>
        </>


    }
    else if (token == false) {
        return <h1 className='display-1'>Loading</h1>
    }
    else {
        return (<Row style={{ width: '60%' }}>
            <Col className='d-flex  align-items-start'>
                <h1 className='display-4'>Student<br /> Management</h1>
                {token}
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
                        <Form.Control type="text" placeholder="Password" required
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" >
                        Submit
                    </Button>

                    {/* <Button variant="primary" onClick={role}>
                        role
                    </Button> */}
                </Form>
            </Col>
        </Row>);
    }

}

export default login;