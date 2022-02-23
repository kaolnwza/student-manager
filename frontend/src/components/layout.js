import React from 'react'
import '../nav.css'
import { Link } from 'react-router-dom'
import { MdRoofing, MdTableView } from "react-icons/md";

export default function layout(props) {
  return (
    <div className="container-fluid bg-brown" >
    <div className="row pl-5">
      
      <div className="col-sm px-5">
        <span className=" display-5 ">Student Manager </span>
      </div>
    </div>
    <div className="row positon-sticky 
              align-items-center  
              ">
      <div className="col-sm-auto p-0 ">
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
            <Link to='/'>
            <li className="pl-2 my-4 ">
              <MdRoofing className='icon-link'/>
            </li>
            </Link>
            <Link to='/manage'>
            <li
              className="pl-2 my-4"
            >
              <MdTableView className='icon-link'/>

            </li>
            </Link>
          </ul>
        </div>
      </div>
      <div className="col-sm content" style={{height:'92vh'}}>
        {props.children}
        <div
        >
        </div>
      </div>
    </div>
  </div>
  )
}
