
import { Container, Row, Col } from 'react-bootstrap';
import Image from 'next/image'
import { useRouter } from 'next/router'
import Link from 'next/link'

export const getServerSideProps = async (ctx) => {
    const resSubject = await fetch('http://localhost:3001/util/getarraybyany/subject/teacher_id/' + ctx.query.teacherid)
    const subject = await resSubject.json()
    const resTeacher = await fetch('http://localhost:3001/util/getarraybyany/teacher/teacher_id/' + ctx.query.teacherid)
    const teacher = await resTeacher.json()

    const resClass = await fetch('http://localhost:3001/util/getarraybyany/class/subject_id/' + subject[0].subject_id)
    const classes = await resClass.json()
    return {
        props: {
            course: subject[0],
            teacher: teacher[0],
            classes: classes
        }
    }
}

const Subject = ({ teacher, course, classes }) => {
    return (<>
        <Row className='h-75 mx-5 justify-content-around' style={{
            background: `linear-gradient(180deg, transparent 20%, #f6eeea 20%)`,
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
                    <h3>{course.subject_id}  {course.subject_name}</h3>
                    <div>
                        Teacher : {teacher.teacher_firstname} {teacher.teacher_lastname}
                    </div>
                    <h3>Classes</h3>

                    <Row className=''>
                        {classes.map((cls, index) => <Col key={index}>
                            {cls.dayweek} <br />
                            {cls.time_start} - {cls.time_end} (Sec {index + 1})
                        </Col>)}
                    </Row>

                    <Row className='text-center mb-3' style={{
                        marginTop: '5rem'
                    }}>
                        <Col>
                            <Link href={{ pathname: `/home/subject/${teacher.teacher_id}/score/${course.subject_id}` }}>

                                <div>
                                    <a class="btn">
                                        <lord-icon
                                            target="a.btn"
                                            trigger="morph"
                                            src="https://cdn.lordicon.com/nocovwne.json"
                                            style={{ height: '4rem', width: '4rem' }}
                                        ></lord-icon>
                                        <p>Student Score</p>
                                    </a>
                                </div>
                            </Link>
                        </Col>
                        <Col>
                            <Link href={{ pathname: `/home/subject/${teacher.teacher_id}/attendance/${course.subject_id}` }}>

                                <div>
                                    <a class="btn">
                                        <lord-icon
                                            target="a.btn"
                                            trigger="morph"
                                            src="https://cdn.lordicon.com/tvyxmjyo.json"
                                            style={{ height: '4rem', width: '4rem' }}
                                        ></lord-icon>
                                        <p>Student attendance</p>
                                    </a>
                                </div>
                            </Link>
                        </Col>

                    </Row>
                </Row>

            </Col>

        </Row>
    </>);
}

export default Subject;