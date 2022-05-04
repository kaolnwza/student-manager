import Link from 'next/link'
import { useEffect, useState } from "react"
// import { Button } from 'react-bootstrap'
// import { useAppContext } from '../context/state';
import Navigate from './Navigator';
import UserContext from '../context/state';

export default function layout({ children, status }) {
  // const mycontext = useAppContext();
  const [login, setLogin] = useState()
  const [user, setUser] = useState(false)
  const value = { user, setUser };
  // useEffect(() => {
  //   // location.reload()
  //   window.localStorage.getItem('token') ? setLogin(true) : setLogin(false)
  //   console.log(login);

  // }, [])

  return (
    <UserContext.Provider value={value}>
      <div className="container-fluid bg-brown " style={{ fontFamily: 'Roboto Slab' }} >
        <div className="row pl-5 position-fixed ">

          <div className="col-sm px-5 py-1 ">
            <h2 className="  ">Student Management  </h2>
          </div>
        </div>
        <div className="row positon-sticky 
              align-items-center  
              ">
          <div className="col-sm-auto p-0 position-fixed">
            <Navigate />
          </div>
          <div className="col-sm content" style={{
            height: '100vh',

          }}>
            {children}
            <div
            >
            </div>
          </div>
        </div >
      </div >
    </UserContext.Provider>)
}
