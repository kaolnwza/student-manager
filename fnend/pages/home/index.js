
import Image from 'next/image'
import { Swiper, SwiperSlide } from "swiper/react";
import { Container, Row, Col, Button } from 'react-bootstrap';

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Parallax, Pagination, Navigation } from "swiper";
import Link from "next/link";
import { useEffect, useState } from 'react';
import { Router, useRouter } from 'next/router';


const Home = () => {
  const [subjects, setSubjects] = useState([])
  const router = useRouter()
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      const resRole = await fetch(`http://${process.env.ip}:3000/auth/role/${window.localStorage.getItem('token')}`, {
        method: 'GET',
        // credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `bearer ${window.localStorage.getItem('token')}`
        }
      })

      const person = await resRole.json()
      console.log(person)

      if (person.role == 'teacher') {
        const resTch = await fetch(`http://${process.env.ip}:3000/util/getarraybyany/subject/teacher_id/${person.user.teacher_id}`)
        const json = await resTch.json()
        console.log(json);

        setSubjects(json)
        setLoading(false)

      } else {
        const resStd = await fetch(`http://${process.env.ip}:3000/class/student/${person.user.student_id}`)
        const json = await resStd.json()
        console.log(json);

        setSubjects(json)
        setLoading(false)

      }

    }

    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, [])

  if (isLoading) return <lord-icon
    src="https://cdn.lordicon.com/xjovhxra.json"
    trigger="loop"
    style={{ height: '5rem', width: '5rem' }}
  >
  </lord-icon>

  return (<>
    <Swiper
      style={{
        "--swiper-navigation-color": "#000",
        "--swiper-pagination-color": "#000",
        height: '30vw',

      }}
      speed={600}
      parallax={true}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Parallax, Pagination, Navigation]}
      className="mySwiper px-5"
    >
      <div
        slot="container-start"
        className="parallax-bg"
        style={{
          background: `#f6eeea`,
        }}
        data-swiper-parallax="-55%"
      ></div>
      {subjects.map((sub, index) => (
        <SwiperSlide key={index}>
          <Row className="h-100">
            <Col lg={5} style={{
              display: 'flex',
              justifyContent: 'right',
              alignItems: "center",

            }}>
              <Image src="/Fresh Folk - Teaching.png" alt="me" width="200%" height="280%" />
            </Col>
            <Col lg={7} style={{
              margin: 'auto'
            }}>
              <div className="title" data-swiper-parallax="-300">
                {sub.subject_name.toUpperCase()}
              </div>
              <div className="subtitle" data-swiper-parallax="-200">
                Coruse Code : {sub.subject_id}
              </div>
              <div className="subtitle" data-swiper-parallax="-200">
              </div>
              <Link
                href={{
                  pathname: `/home/subject/${sub.subject_id}`,
                }} >
                < lord-icon
                  src="https://cdn.lordicon.com/iifryyua.json"
                  trigger="morph"
                  style={{ width: '3rem', height: '3rem', cursor: 'pointer' }}>
                </lord-icon>
              </Link>
            </Col>
          </Row>
        </SwiperSlide>
      ))}

    </Swiper>


    {/* <Button onClick={() => reload()}>re</Button> */}
  </>
  )
}

export default Home;

