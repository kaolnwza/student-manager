import { useEffect, useState } from "react"
import { useRouter } from 'next/router'
import { Tabs, Tab, Button, Modal, Container, Table, InputGroup, FormControl, Form } from 'react-bootstrap';

export const getServerSideProps = async (ctx) => {
    const resClass = await fetch('http://localhost:3001/attendance/class/' + ctx.query.classid)
    const classes = await resClass.json()
    // console.log(classes);
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
    const [selectWeek, setSelectWeek] = useState(0);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [edit, setEdit] = useState(false);

    const handleEditClose = () => setEdit(false);
    const handleEditShow = () => setEdit(true);

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
                <a class="btn text-center w-100" onClick={handleEditShow}>
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

            {/* Add Modal */}
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
                        <Button className="btn py-0  border-success" variant="" onClick={() => {
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

                    </InputGroup>

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

            {/* Edit Modal */}
            <Modal
                show={edit}
                onHide={handleEditClose}
                backdrop="static"
                keyboard={false}
                style={{ fontFamily: 'roboto slab' }}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit Attendance</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form.Group controlId="formBasicSelect">
                        <Form.Label>Select Week </Form.Label>
                        <Form.Select
                            value={selectWeek}
                            onChange={e => {
                                setSelectWeek(e.target.value);
                            }}
                        >
                            <option value={0} disabled>--select--</option>

                            {classes.map((cls, i) => <>
                                {console.log(cls[i].attendance_name)}
                                <option value={cls[i].attendance_id}> {cls[i].attendance_name} </option>

                                
                            </>
                            )}

                        </Form.Select>
                        ID : {selectWeek}
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleEditClose}>
                        Close
                    </Button>
                    <Button variant="primary">Understood</Button>
                </Modal.Footer>
            </Modal>
        </div >

    );
}

export default attendance;