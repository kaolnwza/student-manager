
import { Container, Row, Col } from 'react-bootstrap';
import Image from 'next/image'
import { useRouter } from 'next/router'
import Link from 'next/link'

export const getServerSideProps = async (ctx) => {
    const resSubDetail = await fetch('http://localhost:3001/subject/detail/' + ctx.query.courseid)
    const subjectDetail = await resSubDetail.json()
    // console.log(subjectDetail);
    return {
        props: {
            course: subjectDetail

        }
    }
}

const Subject = ({ course }) => {
    const router = useRouter()
    // console.log(router.query.courseid);
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
                                {cls.time_start} - {cls.time_end} (Sec {index + 1})
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

                    {/* <Row className=' mb-3' style={{
                        marginTop: '5rem'
                    }}>
                        <Col>
                            <Link href={{ pathname: `/home/subject/${router.query.courseid}/score/${course[0].class_id}` }}>

                                <div>
                                    <a class="btn">
                                        <lord-icon
                                            target="a.btn"
                                            trigger="morph"
                                            src="https://cdn.lordicon.com/nocovwne.json"
                                            style={{ height: '3rem', width: '3rem' }}
                                        ></lord-icon>
                                        <p>Student Score</p>
                                    </a>
                                </div>
                            </Link>
                        </Col>
                        <Col>
                            <Link href={{ pathname: `/home/subject/${router.query.courseid}/attendance/${course[0].class_id}` }}>

                                <div>
                                    <a class="btn">
                                        <lord-icon
                                            target="a.btn"
                                            trigger="morph"
                                            src="https://cdn.lordicon.com/tvyxmjyo.json"
                                            style={{ height: '3rem', width: '3rem' }}
                                        ></lord-icon>
                                        <p>Student attendance</p>
                                    </a>
                                </div>
                            </Link>
                        </Col>

                    </Row> */}
                </Row>

            </Col>

        </Row>
    </>);
}

export default Subject;