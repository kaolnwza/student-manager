
import { useEffect, useState } from "react"

import { Swiper, SwiperSlide } from "swiper/react";
import { Container } from 'react-bootstrap';

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Parallax, Pagination, Navigation } from "swiper";


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

    <h1 >Home</h1>
    <>
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
          data-swiper-parallax="-30%"
        ></div>
        {subjects.map((sub, index) => (
          <SwiperSlide>
            <Container>
              <div className="title" data-swiper-parallax="-300">
                {sub.subject_name}
              </div>
              <div className="subtitle" data-swiper-parallax="-200">
                Coruse Code : {sub.subject_id}
              </div>
              <div className="text" data-swiper-parallax="-100">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
                  dictum mattis velit, sit amet faucibus felis iaculis nec. Nulla
                  laoreet justo vitae porttitor porttitor. Suspendisse in sem justo.
                  Integer laoreet magna nec elit suscipit, ac laoreet nibh euismod.
                  Aliquam hendrerit lorem at elit facilisis rutrum. Ut at
                  ullamcorper velit. Nulla ligula nisi, imperdiet ut lacinia nec,
                  tincidunt ut libero. Aenean feugiat non eros quis feugiat.
                </p>
              </div>
            </Container>
          </SwiperSlide>
        ))}

        {/* <SwiperSlide>
          <div className="title" data-swiper-parallax="-300">
            Slide 1
          </div>
          <div className="subtitle" data-swiper-parallax="-200">
            Subtitle
          </div>
          <div className="text" data-swiper-parallax="-100">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
              dictum mattis velit, sit amet faucibus felis iaculis nec. Nulla
              laoreet justo vitae porttitor porttitor. Suspendisse in sem justo.
              Integer laoreet magna nec elit suscipit, ac laoreet nibh euismod.
              Aliquam hendrerit lorem at elit facilisis rutrum. Ut at
              ullamcorper velit. Nulla ligula nisi, imperdiet ut lacinia nec,
              tincidunt ut libero. Aenean feugiat non eros quis feugiat.
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="title" data-swiper-parallax="-300">
            Slide 2
          </div>
          <div className="subtitle" data-swiper-parallax="-200">
            Subtitle
          </div>
          <div className="text" data-swiper-parallax="-100">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
              dictum mattis velit, sit amet faucibus felis iaculis nec. Nulla
              laoreet justo vitae porttitor porttitor. Suspendisse in sem justo.
              Integer laoreet magna nec elit suscipit, ac laoreet nibh euismod.
              Aliquam hendrerit lorem at elit facilisis rutrum. Ut at
              ullamcorper velit. Nulla ligula nisi, imperdiet ut lacinia nec,
              tincidunt ut libero. Aenean feugiat non eros quis feugiat.
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="title" data-swiper-parallax="-300">
            Slide 3
          </div>
          <div className="subtitle" data-swiper-parallax="-200">
            Subtitle
          </div>
          <div className="text" data-swiper-parallax="-100">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
              dictum mattis velit, sit amet faucibus felis iaculis nec. Nulla
              laoreet justo vitae porttitor porttitor. Suspendisse in sem justo.
              Integer laoreet magna nec elit suscipit, ac laoreet nibh euismod.
              Aliquam hendrerit lorem at elit facilisis rutrum. Ut at
              ullamcorper velit. Nulla ligula nisi, imperdiet ut lacinia nec,
              tincidunt ut libero. Aenean feugiat non eros quis feugiat.
            </p>
          </div>
        </SwiperSlide> */}
      </Swiper>
    </>
    {console.log(subjects)}
    {/* <div >{data.name}</div> */}
  </>
  )
}
Home.getInitialProps = async (ctx) => {
  const res = await fetch('http://localhost:3001/util/subject/getall')
  const json = await res.json()
  return { subjects: json }
}

export default Home;
