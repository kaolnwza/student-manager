import React, { useContext, useEffect } from "react";
import { useRouter } from 'next/router'
import Link from 'next/link'

import UserContext from "../context/state";

const Navigate = () => {
    const { user, setUser } = useContext(UserContext);
    const router = useRouter()

    useEffect(() => {
        if (window.localStorage.getItem('token')) {
            setUser(true)
        } else {
            setUser(false)
        }
    }, [])


    return (<div>
        {router.route != '/' ? <ul
            className="
        nav nav-pills nav-flush
        flex-sm-column flex-row flex-nowrap
        mb-auto
        mx-4
        text-center
        
      "
        >
            <li className="pl-2 my-2 ">
                <Link href='/home'>
                    <div>
                        <lord-icon
                            src="https://cdn.lordicon.com/gmzxduhd.json"
                            trigger="morph"

                            style={{ width: '4rem', height: '4rem', cursor: 'pointer' }}
                        >

                        </lord-icon>
                        <article>Home</article>
                    </div>
                </Link>
            </li>
            {user ?
                <li className="pl-2 my-2 " >
                    <Link href='/' >

                        <div onClick={() => {
                            if (confirm('Do you want to log out?')) {
                                setUser(false)
                                window.localStorage.removeItem('token')
                                router.push('/')
                            }

                        }}>
                            <lord-icon
                                src="https://cdn.lordicon.com/iiueiwdd.json"
                                trigger="morph"
                                style={{ width: '3.5rem', height: '3.5rem', cursor: 'pointer' }}
                            >
                            </lord-icon>
                            <article>Log Out</article>
                        </div>
                    </Link>

                </li>
                :
                <li className="pl-2 my-2 " >
                    <Link href='/'>
                        <div onClick={() => {
                            router.push('/')
                            setUser(true)
                        }}>
                            <lord-icon
                                src="https://cdn.lordicon.com/gkditgni.json"
                                trigger="morph"
                                style={{ width: '3.5rem', height: '3.5rem', cursor: 'pointer' }}

                            >
                            </lord-icon>
                            <article>Log In</article>
                        </div>
                    </Link>
                </li>

            }






        </ul> : null}
    </div>);
}

export default Navigate;