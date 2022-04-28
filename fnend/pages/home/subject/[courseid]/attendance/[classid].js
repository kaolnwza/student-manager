import { useEffect, useState } from "react"
import { useRouter } from 'next/router'
import { Tabs, Tab, Button, Modal, Container, Table, InputGroup, FormControl, Form, ButtonGroup, ToggleButton } from 'react-bootstrap';

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
    const [selectWeek, setSelectWeek] = useState(0);
    const [selectStudent, setSelectStudent] = useState(0);
    const [radioValue, setRadioValue] = useState(0);
    const [edit, setEdit] = useState(false);
    const [expandedId, setExpandedId] = useState(-1);
    const [attendanceId, setAttendanceId] = useState(0)
    const handleExpandClick = (i) => {
        setExpandedId(expandedId === i ? -1 : i);
    };
    const status = [
        {
            name: <lord-icon
                src="https://cdn.lordicon.com/hjeefwhm.json"
                trigger="morph"
                style={{ height: '2rem', width: '2rem' }}
            >
            </lord-icon>, value: 'come', color: 'outline-success'
        },
        {
            name: <lord-icon
                src="https://cdn.lordicon.com/abgtphux.json"
                trigger="morph"
            >
            </lord-icon>, value: 'late', color: 'outline-warning'
        },
        {
            name: <lord-icon
                src="https://cdn.lordicon.com/vfzqittk.json"
                trigger="morph"
            >
            </lord-icon>, value: 'notcome', color: 'outline-danger'
        },
    ];

    const rounter = useRouter()

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleEditClose = () => setEdit(false);
    const handleEditShow = () => setEdit(true);
    const addAttendance = () => {
        const data = {
            class_id: rounter.query.classid,
            attendance_name: form
        }
        setShow(false)
        setForm('')
        console.log(data)
    };
    const EditStudent = (status, student) => {
        const data = {
            attendance_id: attendanceId,
            student_id: student,
            attendance_status: status,
        }
        // setSelectWeek(0)
        // setSelectStudent(0)
        // setRadioValue(0)
        // setEdit(false)
        console.log(student);
        console.log(status);
        console.log(attendanceId);
        setRadioValue(status)

        // setRadioValue(status)

    }


    return (
        <div className="d-flex justify-content-center w-75 h-75">

            <Container className="text-center">
                <a class="btn" style={{ position: 'inherit' }} onClick={handleShow}>
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
                                        {/* <th>Edit</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {cls.map((person, j) =>
                                        <tr>
                                            <td>{person.student_id} </td>
                                            <td>{person.student_firstname}</td>
                                            <td>{person.student_lastname}</td>
                                            <td>
                                                {expandedId !== j ?

                                                    person.attendance_status == 'come' ?
                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/hjeefwhm.json"
                                                            trigger="morph"
                                                            style={{ height: '2rem', width: '2rem' }}
                                                            onClick={() => handleExpandClick(j)}
                                                        >
                                                        </lord-icon>
                                                        :
                                                        (person.attendance_status == 'notcome' ?
                                                            <lord-icon
                                                                src="https://cdn.lordicon.com/vfzqittk.json"
                                                                trigger="morph"
                                                                onClick={() => handleExpandClick(j)}
                                                            >
                                                            </lord-icon>
                                                            :
                                                            <lord-icon
                                                                src="https://cdn.lordicon.com/abgtphux.json"
                                                                trigger="morph"
                                                                style={{ height: '2rem', width: '2rem' }}
                                                                onClick={() => handleExpandClick(j)}
                                                            >
                                                            </lord-icon>
                                                        )


                                                    :
                                                    <ButtonGroup >
                                                        {status.map((radio, idx) => (
                                                            <ToggleButton
                                                                key={idx}
                                                                id={`radio-${idx}`}
                                                                type="radio"
                                                                variant={radio.color}
                                                                name="radio"
                                                                value={radio.value}
                                                                // checked={radioValue === radio.value}
                                                                onChange={(e) => {
                                                                    handleExpandClick(j)
                                                                    EditStudent(e.currentTarget.value, person.student_id)
                                                                }}
                                                                onClick={() => {
                                                                    setAttendanceId(person.attendance_id)
                                                                }}
                                                            >
                                                                {radio.name}


                                                            </ToggleButton>
                                                        ))}

                                                    </ButtonGroup>}
                                                {/* {radioValue} */}

                                            </td>
                                            {/* <td>
                                                <Button className="btn py-0 px-0" variant="">
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/wloilxuq.json"
                                                        target="Button.btn"
                                                        trigger="click"
                                                        state="hover-2"
                                                        style={{ height: '2.5rem', width: '2.5rem' }}>
                                                    </lord-icon>
                                                </Button>
                                            </td> */}

                                        </tr>
                                    )}

                                </tbody>
                            </Table>
                        </Tab>
                    )}

                </Tabs>
                {/* <a class="btn " onClick={handleEditShow}>
                    <lord-icon
                        target="a.btn"
                        src="https://cdn.lordicon.com/wloilxuq.json"
                        trigger="morph"
                        style={{ height: '4rem', width: '4rem' }}
                    >
                    </lord-icon>
                    <p>Edit Attendance</p>
                </a> */}
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
                                addAttendance()
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


                        <Form.Label>Select Week | attendance_id : {selectWeek} </Form.Label>
                        <Form.Select
                            value={selectWeek}
                            onChange={e => {
                                setSelectWeek(e.target.value);
                            }}
                        >
                            <option value={0} disabled>--select--</option>

                            {classes.map((cls, i) => <>
                                {/* {console.log(cls[i].attendance_name)} */}
                                <option value={cls[i].attendance_id}> {cls[i].attendance_name} </option>
                            </>
                            )}

                        </Form.Select>


                        <Form.Label className="mt-3">Select Student | Student ID : {selectStudent} </Form.Label>
                        <Form.Select
                            value={selectStudent}
                            onChange={e => {
                                setSelectStudent(e.target.value);
                            }}
                        >
                            <option value={0} disabled>--select--</option>

                            {classes[0].map((student, i) => <>
                                {/* {console.log(student[i].attendance_name)} */}
                                <option value={student.student_id}>{student.student_id} {student.student_firstname} {student.student_lastname} </option>
                            </>
                            )}

                        </Form.Select>

                        <Form.Label className="mt-3">Select Status | Status : {radioValue} </Form.Label><br />
                        {/* <ButtonGroup>
                            {status.map((radio, idx) => (
                                <ToggleButton
                                    key={idx}
                                    id={`radio-${idx}`}
                                    type="radio"
                                    variant={radio.color}
                                    name="radio"
                                    value={radio.value}
                                    checked={radioValue === radio.value}
                                    onChange={(e) => setRadioValue(e.currentTarget.value)}
                                >
                                    {radio.name}
                                </ToggleButton>
                            ))}
                        </ButtonGroup> */}
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="light" className="py-1 btn" onClick={() => {
                        setTimeout(() => {
                            setEdit(false)
                            setSelectWeek(0)
                            setSelectStudent(0)
                            setRadioValue(0)
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
                        setTimeout(() => {
                            // EditStudent()
                        }, 1000)
                    }}>
                        Edit
                        <lord-icon
                            src="https://cdn.lordicon.com/wloilxuq.json"
                            target="Button.btn"
                            trigger="click"
                            state="hover-2"
                            style={{ height: '2.5rem', width: '2.5rem' }}>
                        </lord-icon>
                    </Button>
                </Modal.Footer>
            </Modal>
        </div >

    );
}

export default attendance;