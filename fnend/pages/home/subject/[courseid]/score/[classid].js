import { useRouter } from 'next/router'
import { Tabs, Tab, Button, Modal, Container, Table, InputGroup, FormControl, Form, ButtonGroup, ToggleButton } from 'react-bootstrap';
import { useEffect, useState } from "react"

export const getServerSideProps = async (ctx) => {
    // const resScore = await fetch('http://localhost:3001/score/class/' + ctx.query.classid)
    // const score = await resScore.json()
    const score = [
        [
            {
                score_id: 1,
                score_name: 'Assignment1',
                student_id: '62070002',
                student_firstname: 'Killian',
                student_lastname: 'Heath',
                max_score: 20,
                max_unit_score: 10,
                student_score: 12,
                student_unit_score: 5
            },
            {
                score_id: 1,
                score_name: 'Assignment1',
                student_id: '62070003',
                student_firstname: 'Eric',
                student_lastname: 'Michael',
                max_score: 20,
                max_unit_score: 10,
                student_score: 11,
                student_unit_score: 6
            },
            {
                score_id: 1,
                score_name: 'Assignment1',
                student_id: '62070001',
                student_firstname: 'Emrys',
                student_lastname: 'Terrell',
                max_score: 20,
                max_unit_score: 10,
                student_score: 15,
                student_unit_score: 7
            }
        ],
        [
            {
                score_id: 11,
                score_name: 'Assignment2',
                student_id: '62070002',
                student_firstname: 'Killian',
                student_lastname: 'Heath',
                max_score: 20,
                max_unit_score: 10,
                student_score: 13,
                student_unit_score: 4
            },
            {
                score_id: 11,
                score_name: 'Assignment2',
                student_id: '62070003',
                student_firstname: 'Eric',
                student_lastname: 'Michael',
                max_score: 20,
                max_unit_score: 10,
                student_score: 18,
                student_unit_score: 8
            },
            {
                score_id: 11,
                score_name: 'Assignment2',
                student_id: '62070001',
                student_firstname: 'Emrys',
                student_lastname: 'Terrell',
                max_score: 20,
                max_unit_score: 10,
                student_score: 9,
                student_unit_score: 5
            }
        ]


    ]
    console.log(score);
    return {
        props: {
            score: score
        }
    }
}

const score = ({ score }) => {
    const rounter = useRouter()
    const { classid } = rounter.query
    const [show, setShow] = useState(false);
    const [key, setKey] = useState(0);
    const [form, setForm] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    

    return (<Container className="text-center">
        {console.log(score)}
        <a class="btn" style={{ position: 'inherit' }} onClick={handleShow}>
            <lord-icon
                target="a.btn"
                src="https://cdn.lordicon.com/kpsnbsyj.json"
                trigger="morph"
                style={{ height: '3rem', width: '3rem' }}
            >
            </lord-icon>
            <p>Add Assignment</p>
        </a>
        <Tabs
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3 justify-content-center "
        >

            {score.map((cls, i) =>

                <Tab key={i} eventKey={i} title={`${cls[i].score_name}`} style={{ height: '40vh', overflowY: 'scroll' }}>

                    <Table borderless hover className="text-center" >
                        <thead>
                            <tr >
                                <th>Id</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Max Score ({cls[i].max_score})</th>
                                <th>Max Unit Score ({cls[i].max_unit_score})</th>





                            </tr>
                        </thead>
                        <tbody>
                            {cls.map((person, j) =>
                                <tr key={j}>
                                    <td>{person.student_id} </td>
                                    <td>{person.student_firstname}</td>
                                    <td>{person.student_lastname}</td>
                                    <td>{person.student_score}</td>
                                    <td>{person.student_unit_score}</td>


                                </tr>)}
                        </tbody>
                    </Table>
                </Tab>)}
        </Tabs>

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
                <InputGroup className="mb-3">
                    <FormControl
                        placeholder="Assignment"
                        value={form}
                        onChange={(e) => setForm(e.target.value)}
                    />
                    <Button className="btn py-0  border-success" variant="" onClick={() => {
                        setTimeout(() => {
                            addAssignment()
                        }, 1500)
                    }}>
                        Add
                        <lord-icon
                            src="https://cdn.lordicon.com/mecwbjnp.json"
                            target="Button.btn"
                            trigger="click"
                            style={{ height: '2rem', width: '2rem' }}>
                        </lord-icon>
                    </Button>
                </InputGroup>
                Name :{form} Class_id :{rounter.query.classid}

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

            </Modal.Footer>
        </Modal>
    </Container>);
}

export default score;