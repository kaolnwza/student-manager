import { useEffect, useState } from "react"
import { useRouter } from 'next/router'
import { Tabs, Tab, Button, Modal, Container, Table, InputGroup, FormControl, Form, ButtonGroup, ToggleButton } from 'react-bootstrap';
// import { stringifyQuery } from "next/dist/server/server-route-utils";

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
    console.log(person.user.student_id);
    if (person.role == 'teacher') {
        const resClass = await fetch(`http://${process.env.ip}:3000/attendance/class/` + ctx.query.classid, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${ctx.req.cookies.token}`
            }
        })
        const classes = await resClass.json()

        return {
            props: {
                cls: classes
            }
        }
    } else {
        const resClass = await fetch(`http://${process.env.ip}:3000/student/attendance/${ctx.query.classid}/${person.user.student_id}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${ctx.req.cookies.token}`
            }
        })
        const classes = await resClass.json()
        console.log(classes);
        return {
            props: {
                cls: classes,
                std: true
            }
        }
    }

}

const attendance = ({ cls, std }) => {
    const [classes, setClasses] = useState(cls);
    const [refresh, setRefresh] = useState(0);

    const [key, setKey] = useState(0);
    const [show, setShow] = useState(false);
    const [form, setForm] = useState('');
    const [expandedId, setExpandedId] = useState(-1);
    const [Note, setNote] = useState('');

    const [attendanceId, setAttendanceId] = useState(0)
    const isEmpty = Object.keys(classes).length === 0;
    // const [WeeekIndex, setWeekIndex] = useState(0)

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

    const addAttendance = async () => {
        const data = {
            class_id: rounter.query.classid,
            attendance_name: form
        }

        await fetch(`http://${process.env.ip}:3000/attendance/addclass`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${window.localStorage.getItem('token')}`
            }
        }).then((res) => res.json())
            .then((data) => {
                console.log(data)
            })

        setForm('')
        // console.log({
        //     class_id: rounter.query.classid,
        //     attendance_name: form
        // })
        // console.log(response);
        setRefresh(refresh + 1)

    };


    const EditStudent = async (status, student) => {
        const data = {
            attendance_id: parseInt(attendanceId),
            student_id: student,
            attendance_status: status,
            attendance_note: Note

        }
        const resEdit = await fetch(`http://${process.env.ip}:3000/attendance/update_student`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${window.localStorage.getItem('token')}`
            }
        })
        const response = await resEdit.json()
        console.log(response);
        setRefresh(refresh + 1)
    }

    useEffect(() => {
        const fetchMyAPI = async () => {
            const resClass = await fetch(`http://${process.env.ip}:3000/attendance/class/` + rounter.query.classid)
            const classes = await resClass.json()
            setClasses(classes)
            // console.log();

        }

        fetchMyAPI()
    }, [refresh])



    return (

        <Container className="text-center">
            {std ? null :
                <a class="btn d-block" style={{ position: 'inherit' }} onClick={handleShow}>
                    <lord-icon
                        target="a.btn"
                        src="https://cdn.lordicon.com/auvicynv.json"
                        trigger="morph"
                        style={{ height: '3rem', width: '3rem' }}
                    >
                    </lord-icon>
                    <p>Add Attendance</p>
                </a>
            }
            {isEmpty ? <>No Attendance Yet</> :
                std ?
                    <>
                        <h2>ID : {cls[0].student_id}</h2>
                        <h1 className="mb-5">{cls[0].student_firstname} {cls[0].student_lastname}</h1>
                        <Table borderless hover>
                            {console.log(cls)}
                            <thead>
                                <tr>
                                    {cls.map(week =>
                                        <th>{week.attendance_name}</th>
                                    )}

                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    {cls.map(week =>
                                        <td>{
                                            week.attendance_status == 'come' ?
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/hjeefwhm.json"
                                                    trigger="morph"
                                                    style={{ cursor: 'pointer' }}
                                                >
                                                </lord-icon>
                                                :
                                                (week.attendance_status == 'notcome' ?
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/vfzqittk.json"
                                                        trigger="morph"

                                                        style={{ cursor: 'pointer' }}

                                                    >
                                                    </lord-icon>
                                                    :
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/abgtphux.json"
                                                        trigger="morph"
                                                        style={{ cursor: 'pointer' }}

                                                    >
                                                    </lord-icon>
                                                )}</td>
                                    )}
                                </tr>


                            </tbody>
                        </Table></>
                    :


                    <Tabs
                        activeKey={key}
                        onSelect={(k) => setKey(k)}
                        className="mb-3 justify-content-center "
                    >
                        {classes.map((cls, i) =>

                            <Tab key={i} eventKey={i} title={`${cls[0].attendance_name}`} style={{ height: '40vh', overflowY: 'scroll' }} >

                                <Table borderless hover className="text-center" >
                                    <thead>
                                        <tr >
                                            <th>Id</th>
                                            <th>First Name</th>
                                            <th>Last Name</th>
                                            <th>Status</th>
                                            <th>Note</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cls.map((person, j) =>
                                            <tr>
                                                <td>{person.student_id} </td>
                                                <td>{person.student_firstname}</td>
                                                <td>{person.student_lastname}</td>
                                                {/* {person.attendance_status = 'come'} */}
                                                <td className="w-25 p-0 m-0">
                                                    {expandedId !== j ?
                                                        person.attendance_status == 'come' ?
                                                            <lord-icon
                                                                src="https://cdn.lordicon.com/hjeefwhm.json"
                                                                trigger="morph"
                                                                style={{ cursor: 'pointer' }}
                                                                onClick={() => {
                                                                    setNote(person.attendance_note)
                                                                    handleExpandClick(j)
                                                                }}
                                                            >
                                                            </lord-icon>
                                                            :
                                                            (person.attendance_status == 'notcome' ?
                                                                <lord-icon
                                                                    src="https://cdn.lordicon.com/vfzqittk.json"
                                                                    trigger="morph"
                                                                    onClick={() => {
                                                                        setNote(person.attendance_note)
                                                                        handleExpandClick(j)
                                                                    }}
                                                                    style={{ cursor: 'pointer' }}

                                                                >
                                                                </lord-icon>
                                                                :
                                                                <lord-icon
                                                                    src="https://cdn.lordicon.com/abgtphux.json"
                                                                    trigger="morph"
                                                                    style={{ cursor: 'pointer' }}
                                                                    onClick={() => {
                                                                        setNote(person.attendance_note)
                                                                        handleExpandClick(j)
                                                                    }}
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

                                                        </ButtonGroup>
                                                    }
                                                </td>
                                                <td className="w-25 p-0 ">
                                                    {expandedId !== j ?
                                                        person.attendance_note :
                                                        <FormControl
                                                            className="w-50 d-inline"
                                                            placeholder="Note"
                                                            defaultValue={person.attendance_note}
                                                            onChange={(e) => setNote(e.target.value)}
                                                        />
                                                    }
                                                </td>

                                            </tr>)}
                                    </tbody>
                                </Table>
                            </Tab>)
                        }
                    </Tabs>
            }

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
                    <Form.Text>Name</Form.Text>

                    <InputGroup className="mb-3">

                        <FormControl
                            placeholder="Attendance"
                            value={form}
                            onChange={(e) => setForm(e.target.value)}
                        />
                        <Button className="btn py-0  border-success" variant="" onClick={() => {
                            addAttendance()
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
                    </InputGroup>
                    {/* Name :{form} Class_id :{rounter.query.classid} */}

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

        </Container>

    );
}

export default attendance;