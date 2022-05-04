import { useRouter } from 'next/router'
import { Tabs, Tab, Button, Modal, Container, Table, InputGroup, FormControl, Form, ButtonGroup, ToggleButton, Row, Col, Alert } from 'react-bootstrap';
import { useEffect, useState } from "react"

export const getServerSideProps = async (ctx) => {
    const resRole = await fetch(`http://${process.env.ip}:3000/auth/role/${ctx.req.cookies.token}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `bearer ${ctx.req.cookies.token}`
        }
    })

    const person = await resRole.json()
    if (person.role == 'teacher') {
        const resScore = await fetch(`http://${process.env.ip}:3000/score/class/` + ctx.query.classid, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${ctx.req.cookies.token}`
            }
        })
        const score = await resScore.json()

        return {
            props: {
                s: score
            }
        }
    } else {
        const resScore = await fetch(`http://${process.env.ip}:3000/student/score/${ctx.query.classid}/${person.user.student_id}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${ctx.req.cookies.token}`
            }
        })
        const score = await resScore.json()
        console.log(score);
        return {
            props: {
                s: score,
                std: true
            }
        }
    }
}

const Assignment = ({ s, std }) => {
    const rounter = useRouter()
    const [score, setScore] = useState(s);
    const [refresh, setRefresh] = useState(0);


    const [show, setShow] = useState(false);
    const [key, setKey] = useState(0);
    const [form, setForm] = useState('');
    const [scores, setMaxScore] = useState('');
    const [unit, setUnit] = useState('');
    const [editScore, setEditScore] = useState(-1)
    const isEmpty = Object.keys(score).length === 0;
    const [assignment, setAssignment] = useState(0);
    const [Note, setNote] = useState('');



    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleClick = (i) => {
        setEditScore(editScore === i ? -1 : i);
    };

    useEffect(() => {
        const fetchMyAPI = async () => {
            const resScore = await fetch(`http://${process.env.ip}:3000/score/class/` + rounter.query.classid, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `bearer ${window.localStorage.getItem('token')}`
                }
            })
            const score = await resScore.json()
            setScore(score)


        }

        fetchMyAPI()
    }, [refresh])

    const addAssignment = async () => {
        const data = {
            class_id: rounter.query.classid,
            score_name: form,
            max_score: parseInt(scores),
            unit_score: parseInt(unit)
        }

        const resAttendance = await fetch(`http://${process.env.ip}:3000/score/addclass`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${window.localStorage.getItem('token')}`
            }
        })
        const response = await resAttendance.json()

        setForm('')
        setMaxScore('')
        setUnit('')
        console.log(response);
    };

    const editAssignment = async (score, id, max) => {
        const data = {
            score_id: score,
            student_id: id,
            student_score: assignment,
            score_note: Note
        }
        if (assignment > max) {
            alert('Score must less than Max Score')
        } else {
            const resAttendance = await fetch(`http://${process.env.ip}:3000/score/update_student`, {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `bearer ${window.localStorage.getItem('token')}`
                }
            })
            const response = await resAttendance.json()
            setRefresh(refresh - 1)

            console.log(data);
            console.log(response);
        }


    };



    return (
        <Container className="text-center">
            {std ? null :
                <a class="btn d-block" style={{ position: 'inherit' }} onClick={handleShow}>
                    <lord-icon
                        target="a.btn"
                        src="https://cdn.lordicon.com/kpsnbsyj.json"
                        trigger="morph"
                        style={{ height: '3rem', width: '3rem' }}
                    >
                    </lord-icon>
                    <p>Add Assignment</p>
                </a>}
            {isEmpty ? <>No Assigntment Yet</> :
                std ? <>
                    <h2>ID : {s[0].student_id}</h2>
                    <h1 className="mb-5">{s[0].student_firstname} {s[0].student_lastname}</h1>

                    <Row style={{ fontWeight: 'bolder' }}>
                        {s.map(s =>
                            <Col>{s.score_name}
                                <Row className='p-3 '>
                                    <Col>Max score ({s.max_score})</Col>
                                    <Col>Max unit score ({s.max_unit_score})</Col>

                                </Row>
                            </Col>
                        )}

                    </Row>



                    <Row>
                        {s.map(s => <>
                            <Col>{s.student_score}</Col>
                            <Col>{s.student_unit_score}</Col>
                        </>
                        )}
                    </Row>


                </>
                    :

                    <Tabs
                        activeKey={key}
                        onSelect={(k) => setKey(k)}
                        className="mb-3 justify-content-center "
                    >

                        {score.map((cls, i) =>

                            <Tab key={i} eventKey={i} title={`${cls[0].score_name}`} style={{ height: '40vh', overflowY: 'scroll' }}>

                                <Table borderless hover className="text-center" >
                                    <thead>
                                        <tr >
                                            <th>Id</th>
                                            <th>First Name</th>
                                            <th>Last Name</th>
                                            <th>Max Score ({cls[0].max_score}) </th>
                                            <th>Max Unit Score ({cls[0].max_unit_score})</th>
                                            <th>Note </th>






                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cls.map((person, j) =>
                                            <tr key={j}>
                                                <td>{person.student_id} {person.score_id}</td>
                                                <td>{person.student_firstname}</td>
                                                <td>{person.student_lastname}</td>
                                                <td >
                                                    {editScore !== j ?
                                                        <div onClick={() => {
                                                            handleClick(j)
                                                            setNote(person.score_note)
                                                            setAssignment(person.student_score)

                                                        }}>{person.student_score}</div>
                                                        :
                                                        <Form onSubmit={() => {
                                                            handleClick(j)
                                                            editAssignment(person.score_id, person.student_id, person.max_score)
                                                        }}>

                                                            <FormControl
                                                                type='number'
                                                                className="w-50 d-inline"
                                                                placeholder="Score"
                                                                defaultValue={`${person.student_score}`}
                                                                onChange={(e) => setAssignment(e.target.value)}
                                                            />
                                                        </Form>

                                                    }
                                                </td>
                                                <td>{person.student_unit_score.toFixed(2)}</td>
                                                <td>
                                                    {editScore !== j ?
                                                        <div onClick={() => handleClick(j)}>{person.score_note}</div>
                                                        :
                                                        <Form onSubmit={() => {
                                                            handleClick(j)
                                                            editAssignment(person.score_id, person.student_id)
                                                        }}
                                                        >

                                                            <FormControl
                                                                // type='text'
                                                                className="w-50 d-inline"
                                                                placeholder="Note"
                                                                // value={Note}
                                                                defaultValue={person.score_note}

                                                                onChange={(e) => setNote(e.target.value)}
                                                            />
                                                        </Form>

                                                    }

                                                </td>
                                            </tr>)}
                                    </tbody>
                                </Table>
                            </Tab>)}
                    </Tabs>
            }


            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                style={{ fontFamily: 'roboto slab' }}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add Assignment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Text>Assignment</Form.Text>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Assignment"

                            value={form}
                            onChange={(e) => setForm(e.target.value)}
                        />

                    </InputGroup>
                    <Row>
                        <Col>
                            <Form.Text>Max Score</Form.Text>

                            <FormControl
                                type='number'

                                placeholder="Max Score"
                                value={scores}
                                onChange={(e) => setMaxScore(e.target.value)}
                            />
                        </Col>
                        <Col>
                            <Form.Text>Max Unit Score</Form.Text>

                            <FormControl
                                type='number'
                                placeholder="Max Unit Score"
                                value={unit}
                                onChange={(e) => setUnit(e.target.value)}
                            />
                        </Col>

                    </Row>
                    {/* Name :{form} Score : {scores} Unit : {unit} Class_id :{rounter.query.classid} */}

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="light" className="py-1 btn" onClick={() => {
                        setTimeout(() => {
                            setShow(false)
                        }, 50)
                    }}>
                        Cancel
                        <lord-icon
                            src="https://cdn.lordicon.com/eflfmgmj.json"
                            trigger="click"
                            target="Button.btn"
                            colors="primary:#000"
                            state="hover-1"
                            style={{ height: '1.5rem', width: '1.5rem' }}>
                        </lord-icon>
                    </Button>
                    <Button className="btn py-0  border-success" variant="" onClick={() => {
                        addAssignment()
                        setTimeout(() => {
                            setRefresh(refresh + 1)
                            setShow(false)
                        }, 2000)
                    }}>
                        Add
                        <lord-icon
                            src="https://cdn.lordicon.com/mecwbjnp.json"
                            target="Button.btn"
                            trigger="click"
                            style={{ height: '2rem', width: '2rem' }}>
                        </lord-icon>
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container >);
}

export default Assignment;