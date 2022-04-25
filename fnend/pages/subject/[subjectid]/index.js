
import { Container, Row, Col } from 'react-bootstrap';
import Image from 'next/image'
import { useRouter } from 'next/router'
import Link from 'next/link'

// export const getServerSideProps = async (ctx) => {
//     // const res = await fetch('http://localhost:3001/util/subject/getall')
//     // const json = await res.json()
//     console.log(ctx);
//     return { props: { detail: ctx.query } }
// }

const Subject = () => {
    const router = useRouter()
    const { sid, name, teacher, subjectid } = router.query
    console.log(router.query);
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
                    <h3>{sid} {name} </h3>
                    <div>
                        Teacher : {teacher}
                    </div>
                    <h3>Classes</h3>

                    <Row className=''>
                        <Col>
                            Monday <br />
                            09.00 - 12.00 (Sec 1)
                        </Col>
                        <Col>
                            Monday <br />
                            09.00 - 12.00 (Sec 1)
                        </Col>
                        <Col>
                            Monday <br />
                            09.00 - 12.00 (Sec 1)
                        </Col>

                    </Row>

                    <Row className='text-center mb-3' style={{
                        marginTop: '5rem'
                    }}>
                        <Col>

                            <a class="btn">
                                <lord-icon
                                    target="a.btn"
                                    trigger="morph"
                                    src="https://cdn.lordicon.com/nocovwne.json"
                                    style={{ height: '4rem', width: '4rem' }}
                                ></lord-icon>
                                <p>Student Score</p>
                            </a>
                        </Col>
                        <Col>
                            <Link href={{ pathname: `/subject/${subjectid}/attendance/${subjectid}` }}>
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