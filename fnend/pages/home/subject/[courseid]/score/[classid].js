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
    const router = useRouter()
    const { classid } = router.query
    const [key, setKey] = useState(0);

    return (<Container>
        {console.log(score)}
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
                                <tr>
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
    </Container>);
}

export default score;