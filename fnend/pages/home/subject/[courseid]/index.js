
import { Container, Row, Col } from 'react-bootstrap';
import Image from 'next/image'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useState, useEffect } from 'react';

// export const getServerSideProps = async (ctx) => {


// }

const Subject = () => {
    const [course, setCourse] = useState([-1])
    const [isLoading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        // declare the data fetching function

        const fetchData = async () => {
            setLoading(true)
            const resRole = await fetch(`http://${process.env.ip}:3000/auth/role/${window.localStorage.getItem('token')}`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `bearer ${window.localStorage.getItem('token')}`
                }
            })

            const person = await resRole.json()

            if (person.role == 'student') {
                const resStdDetail = await fetch(`http://${process.env.ip}:3000/class/student/${person.user.student_id}/subject/` + router.query.courseid)
                const subjectDetail = await resStdDetail.json()

                setCourse(subjectDetail)



            } else {
                const resTchDetail = await fetch(`http://${process.env.ip}:3000/subject/detail/` + router.query.courseid)
                const json = await resTchDetail.json()

                setCourse(json)
                setLoading(false)


            }
        }

        // call the function
        fetchData()
            // make sure to catch any error
            .catch(console.error);
    }, [])


    if (isLoading) return <p>Loading...</p>
    return (<>
        <Row className='h-75 mx-5 justify-content-around' style={{
            background: `linear-gradient(180deg, transparent 30%, #f6eeea 30%)`,
        }}>
            <Col lg={4} className='d-flex justify-content-end align-items-start'>
                <Image src="/Fresh Folk - Teaching.png" alt="me" width="200%" height="280%" />

            </Col>
            <Col lg={7} style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'end',
            }}>
                <Row >
                    <h3>{router.query.courseid} {course[0].subject_name}</h3>
                    <div>
                        Teacher : {course[0].teacher_firstname} {course[0].teacher_lastname}
                    </div>
                    <h3>Classes</h3>

                    <Row className=''>
                        {course.map((cls, index) =>
                            <Col key={index}>
                                {cls.dayweek} <br />
                                {cls.time_start} - {cls.time_end}
                                <Row className='mb-5'>
                                    <Col lg={3}>
                                        <Link href={{ pathname: `/home/subject/${router.query.courseid}/score/${cls.class_id}` }}>

                                            <div>
                                                <a class="btn">
                                                    <lord-icon
                                                        target="a.btn"
                                                        trigger="morph"
                                                        src="https://cdn.lordicon.com/nocovwne.json"
                                                        style={{ height: '3rem', width: '3rem' }}
                                                    ></lord-icon>
                                                    <p style={{ lineHeight: '1rem' }}>Student Score</p>
                                                </a>
                                            </div>
                                        </Link>
                                    </Col>
                                    <Col lg={3}>
                                        <Link href={{ pathname: `/home/subject/${router.query.courseid}/attendance/${cls.class_id}` }}>

                                            <div>
                                                <a class="btn">
                                                    <lord-icon
                                                        target="a.btn"
                                                        trigger="morph"
                                                        src="https://cdn.lordicon.com/tvyxmjyo.json"
                                                        style={{ height: '3rem', width: '3rem' }}
                                                    ></lord-icon>
                                                    <p style={{ lineHeight: '1rem' }}>Student attendance</p>
                                                </a>
                                            </div>
                                        </Link>
                                    </Col>

                                </Row>
                            </Col>)}
                    </Row>

                </Row>

            </Col>

        </Row>
    </>);
}

export default Subject;