import React from 'react'
import '../nav.css'

export default function layout(props) {
  return (
    <div className="container-fluid bg-brown" >
    <div className="row ">
      
      <div className="col-sm align-items-center ">
        <span className=" text-left "></span>
        <span className=" display-5 ">Student Manager </span>
      </div>
    </div>
    <div className="row positon-sticky ">
      <div className="col-sm-auto p-0">
        <div className=''>
          <ul
            className="
              nav nav-pills nav-flush
              flex-sm-column flex-row flex-nowrap
              mb-auto
              mx-4
              text-center
              align-items-center
              
            "
          >
            
            <li className="pl-2 iconEffect">
              1
            </li>
            <li
              className="pl-2 iconEffect"
            >
            2
            </li>
          </ul>
        </div>
      </div>
      <div className="col-sm  " style={{height:'83.3vh'}}>
        {props.children}
        <div
        >
        </div>
      </div>
    </div>
  </div>
  )
}
