import { useEffect, useState } from "react"
import { useRouter } from 'next/router'
import { Tabs, Tab, Row, Col, Container, Nav } from 'react-bootstrap';

export const getServerSideProps = async (ctx) => {
    const resClass = await fetch('http://localhost:3001/attendance/class/' + ctx.query.classid)
    const classes = await resClass.json()
    console.log(classes);
    return {
        props: {
            classes: classes
        }
    }
}
const attendance = ({ classes }) => {
    const [key, setKey] = useState(0);

    const [week, setWeek] = useState([''])

    const [atdid, setAtdid] = useState(0);
    const [studentlist, setList] = useState([])

    // useEffect(() => {
    //     // declare the data fetching function
    //     const fetchData = async () => {
    //         const resAtten = await fetch(`http://localhost:3001/attendance/class/${key}`);
    //         const atten = await resAtten.json()
    //         console.log(atten);
    //         setWeek(atten)
    //     }

    //     // call the function
    //     fetchData()
    //         // make sure to catch any error
    //         .catch(console.error);
    // }, [key])


    const fetchStudent = async (id) => {
        const resStudent = await fetch(`http://localhost:3001/util/getarraybyany/student_attendance/attendance_id/${id}`);
        const student = await resStudent.json()
        console.log(student);

        setList(student)
    }

    return (
        <div className="d-flex justify-content-center w-75 h-50">

            <Container >

                <Tabs
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                    className="mb-3   justify-content-center "
                // onClick={() => fetchMyAPI()}
                >

                    {classes.map((cls, i) =>
                        <Tab key={i} eventKey={i} title={`${cls[i].attendance_id}`} >
                            {/* {cls} */}
                            {/* <Tab.Container
                                activeKey={atdid}
                                onSelect={(k) => setAtdid(k)}
                                id="left-tabs-example"
                                defaultActiveKey="first">
                                <Row>
                                    <Col sm={3}>
                                        <Nav variant="pills" className="flex-column">
                                            {week.map((week, j) =>
                                                <Nav.Item key={j}>
                                                    <Nav.Link eventKey={week.attendance_id}>{week.attendance_name}</Nav.Link>
                                                </Nav.Item>
                                            )}
                                        </Nav>
                                    </Col>
                                    <Col sm={9}>
                                        <Tab.Content>
                                            {week.map((week, x) =>

                                                <Tab.Pane key={x} eventKey={week.attendance_id} >
                                                    {studentlist.map(person => <ul>
                                                        <li>{person.student_id} | {person.attendance_status == 'come' ?
                                                            <lord-icon
                                                                src="https://cdn.lordicon.com/hjeefwhm.json"
                                                                trigger="morph"
                                                                style={{ height: '2rem', width: '2rem' }}
                                                            >
                                                            </lord-icon>
                                                            :
                                                            (person.attendance_status == 'notcome' ?
                                                                <lord-icon
                                                                    src="https://cdn.lordicon.com/vfzqittk.json"
                                                                    trigger="morph"
                                                                >
                                                                </lord-icon>
                                                                :
                                                                <lord-icon
                                                                    src="https://cdn.lordicon.com/abgtphux.json"
                                                                    trigger="morph"
                                                                    style={{ height: '2rem', width: '2rem' }}
                                                                >
                                                                </lord-icon>
                                                            )
                                                        }
                                                        </li>
                                                    </ul>
                                                    )}

                                                </Tab.Pane>
                                            )}
                                        </Tab.Content>

                                    </Col>
                                </Row>
                            </Tab.Container> */}



                        </Tab>
                    )}
                    {/* {key} */}

                </Tabs>
            </Container>
        </div>

    );
}

export default attendance;