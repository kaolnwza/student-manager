import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import Link from "next/link";
import Login from '../components/Login';
import { useAppContext } from '../context/state';
import UserContext from '../context/state';

const login = () => {
    // const mycontext = useAppContext();
    const [user, setUser] = useState(false)
    const value = { user, setUser };

    const [token, setToken] = useState(false)

    const rounter = useRouter()

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setToken(window.localStorage.getItem('token'))
        }
    }, [])





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
                <h1 className='display-4'>Student<br /> Management </h1>
                {/* {token} */}
            </Col>
            <Col>
                <UserContext.Provider value={value}>
                    <Login />
                </UserContext.Provider>
            </Col>
        </Row>);
    }

}

export default login;