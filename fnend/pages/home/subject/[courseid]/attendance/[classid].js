import { useEffect, useState } from "react"
import { useRouter } from 'next/router'
import { Tabs, Tab, Button, Modal, Container, Table, InputGroup, FormControl } from 'react-bootstrap';

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
    const [show, setShow] = useState(false);
    const [form, setForm] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className="d-flex justify-content-center w-75 h-75">

            <Container >
                <a class="btn text-center w-100" onClick={handleShow}>
                    <lord-icon
                        target="a.btn"
                        src="https://cdn.lordicon.com/auvicynv.json"
                        trigger="morph"
                        style={{ height: '3rem', width: '3rem' }}
                    >
                    </lord-icon>
                    <p>Add Attendance</p>
                </a>

                <Tabs
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                    className="mb-3 justify-content-center "
                >

                    {classes.map((cls, i) =>

                        <Tab key={i} eventKey={i} title={`${cls[i].attendance_name}`} style={{ height: '40vh', overflowY: 'scroll' }}>

                            <Table borderless hover className="text-center" >
                                <thead>
                                    <tr >
                                        <th>Id</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cls.map((person, j) =>
                                        <tr>
                                            <td>{person.student_id} </td>
                                            <td>{person.student_firstname}</td>
                                            <td>{person.student_lastname}</td>
                                            <td>
                                                {person.attendance_status == 'come' ?
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

                                            </td>
                                        </tr>
                                    )}

                                </tbody>
                            </Table>
                        </Tab>
                    )}

                </Tabs>
                <a class="btn text-center w-100">
                    <lord-icon
                        target="a.btn"
                        src="https://cdn.lordicon.com/wloilxuq.json"
                        trigger="morph"
                        style={{ height: '4rem', width: '4rem' }}
                    >
                    </lord-icon>
                    <p>Edit Attendance</p>
                </a>
            </Container>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                // centered
                style={{ fontFamily: 'roboto slab' }}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add Attendance</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Attendance"
                            value={form}
                            onChange={(e) => setForm(e.target.value)}
                        />

                    </InputGroup>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" className="py-1 btn" onClick={() => {
                        setTimeout(() => {
                            setShow(false)
                        }, 50)
                    }}>
                        Cancel
                        <lord-icon
                            src="https://cdn.lordicon.com/eflfmgmj.json"
                            trigger="click"
                            target="Button.btn"
                            colors="primary:#fff"
                            state="hover-1"
                            style={{ height: '1.5rem', width: '1.5rem' }}>
                        </lord-icon>
                    </Button>
                    <Button className="btn py-0" variant="light" onClick={() => {
                        setTimeout(() => {
                            setShow(false)
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
                </Modal.Footer>
            </Modal>
        </div >

    );
}

export default attendance;