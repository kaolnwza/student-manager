
import Image from 'next/image'
import { Swiper, SwiperSlide } from "swiper/react";
import { Container, Row, Col } from 'react-bootstrap';

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Parallax, Pagination, Navigation } from "swiper";
import Link from "next/link";

export const getServerSideProps = async () => {
  const res = await fetch('http://localhost:3000/util/subject/getall')
  const json = await res.json()
  return { props: { subjects: json } }
}
const Home = ({ subjects }) => {

  // const [data, setData] = useState('null')
  // const [loading, setLoading] = useState(false)
  // const [error, setError] = useState(null)
  // useEffect(
  //   () => {
  //     setLoading(true)
  //     fetch('http://localhost:3001/util/subject/getall')
  //       .then((res) => res.json())
  //       .then((json) => {
  //         setData(json)
  //       })
  //       .catch((error) => setError(error))
  //       .finally(() => setLoading(false))
  //   },
  //   [],
  // )
  // if (loading) {
  //   return (
  //     <div>Loading...</div>
  //   )
  // }
  // if (error) {
  //   return (
  //     <div>Error: {error.message}</div>
  //   )
  // }
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
        <SwiperSlide>
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
              {/* <div className="subtitle" data-swiper-parallax="-200">
                Teacher : {sub.teacher_id}
              </div> */}
              <Link
                // as={`/home/subject/${sub.teacher_id}`}
                href={{
                  pathname: `/home/subject/${sub.subject_id}`,
                  // query: {
                  //   sid: sub.subject_id,
                  //   name: sub.subject_name,
                  //   teacher: sub.teacher_id
                  // }
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

  </>
  )
}

export default Home;
