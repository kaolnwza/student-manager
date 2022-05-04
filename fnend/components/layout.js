import Link from 'next/link'
import { useEffect, useState } from "react"
import { useRouter } from 'next/router'

export default function layout({ children }) {
  const router = useRouter()
  // console.log(router.route);
  const [login, setLogin] = useState(false)
  useEffect(() => {
    setLogin(window.localStorage.getItem('token'))
  }, [])

  return (
    <div className="container-fluid bg-brown " style={{ fontFamily: 'Roboto Slab' }} >
      <div className="row pl-5 position-fixed ">

        <div className="col-sm px-5 py-1 ">
          <h2 className="  ">Student Management </h2>
        </div>
      </div>
      <div className="row positon-sticky 
              align-items-center  
              ">
        <div className="col-sm-auto p-0 position-fixed">
          <div>
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
              {login ? <li className="pl-2 my-2 ">

                <Link href='/'>
                  <div>
                    <lord-icon
                      src="https://cdn.lordicon.com/iiueiwdd.json"
                      trigger="morph"
                      style={{ width: '3.5rem', height: '3.5rem', cursor: 'pointer' }}
                    >
                    </lord-icon>
                    <article>Log Out</article>
                  </div>
                </Link>
              </li> : <li className="pl-2 my-2 ">
                <Link href='/'>
                  <div>
                    <lord-icon
                      src="https://cdn.lordicon.com/gkditgni.json"
                      trigger="morph"
                      style={{ width: '3.5rem', height: '3.5rem', cursor: 'pointer' }}

                    >
                    </lord-icon>
                    <article>Log In</article>
                  </div>
                </Link>
              </li>}



            </ul> : null}
          </div>
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
  )
}
