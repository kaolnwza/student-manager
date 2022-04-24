import Link from 'next/link'
import { MdRoofing, MdTableView } from "react-icons/md";

export default function layout({ children }) {
  return (
    <div className="container-fluid bg-brown " style={{ background: '#f6eeea', fontFamily: 'Roboto Slab' }} >
      <div className="row pl-5 position-fixed">

        <div className="col-sm px-5 py-1">
          <span className=" display-5 ">Student Manager </span>
        </div>
      </div>
      <div className="row positon-sticky 
              align-items-center  
              ">
        <div className="col-sm-auto p-0 position-fixed">
          <div>
            <ul
              className="
              nav nav-pills nav-flush
              flex-sm-column flex-row flex-nowrap
              mb-auto
              mx-4
              text-center
              
            "
            >
              <Link href='/'>
                <li className="pl-2 my-4 ">
                  <MdRoofing className='icon-link' size={40} />
                </li>
              </Link>
              <Link href='/Manage'>
                <li
                  className="pl-2 my-4"
                >
                  <MdTableView className='icon-link' size={40} />

                </li>
              </Link>
            </ul>
          </div>
        </div>
        <div className="col-sm content" style={{ height: '92vh' }}>
          {children}
          <div
          >
          </div>
        </div>
      </div >
    </div >
  )
}
