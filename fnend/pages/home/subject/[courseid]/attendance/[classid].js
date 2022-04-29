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
            class_id: rounter.query.classid,
            attendance_id: attendanceId,
            student_id: student,
            attendance_status: status,
        }

        console.log(data);

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
                                    </tr>
                                </thead>
                                <tbody>
                                    {cls.map((person, j) =>
                                        <tr>
                                            <td>{person.student_id} </td>
                                            <td>{person.student_firstname}</td>
                                            <td>{person.student_lastname}</td>
                                            <td className="w-25 p-0 m-0">
                                                {expandedId !== j ?
                                                    person.attendance_status == 'come' ?
                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/hjeefwhm.json"
                                                            trigger="morph"
                                                            style={{ cursor: 'pointer' }}
                                                            onClick={() => handleExpandClick(j)}
                                                        >
                                                        </lord-icon>
                                                        :
                                                        (person.attendance_status == 'notcome' ?
                                                            <lord-icon
                                                                src="https://cdn.lordicon.com/vfzqittk.json"
                                                                trigger="morph"
                                                                onClick={() => handleExpandClick(j)}
                                                                style={{ cursor: 'pointer' }}

                                                            >
                                                            </lord-icon>
                                                            :
                                                            <lord-icon
                                                                src="https://cdn.lordicon.com/abgtphux.json"
                                                                trigger="morph"
                                                                style={{ cursor: 'pointer' }}
                                                                onClick={() => handleExpandClick(j)}
                                                            >
                                                            </lord-icon>
                                                        )
                                                    :
                                                    <ButtonGroup >
                                                        {status.map((radio, idx) => (
                                                            <ToggleButton
                                                                className="p-0"
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
                                                                onClick={(e) => {
                                                                    setAttendanceId(person.attendance_id)
                                                                }}
                                                            >
                                                                {radio.name}


                                                            </ToggleButton>
                                                        ))}

                                                    </ButtonGroup>}
                                            </td>
                                        </tr>)}
                                </tbody>
                            </Table>
                        </Tab>)}
                </Tabs>
            </Container>

            {/* Add Modal */}
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
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

        </div >

    );
}

export default attendance;