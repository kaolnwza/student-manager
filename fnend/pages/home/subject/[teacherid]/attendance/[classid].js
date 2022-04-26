import { useEffect, useState } from "react"
import { useRouter } from 'next/router'
import { Tabs, Tab, Row, Col, Container } from 'react-bootstrap';

export const getServerSideProps = async (ctx) => {
    const resClass = await fetch('http://localhost:3001/util/getarraybyany/class/subject_id/' + ctx.query.classid)
    const classes = await resClass.json()
    const resAtten = await fetch(`http://localhost:3001/util/getarraybyany/class_attendance/class_id/62002`)
    const atten = await resAtten.json()
    console.log(atten);
    return {
        props: {
            classes: classes
        }
    }
}
const attendance = ({ classes }) => {
    const [key, setKey] = useState(classes[0].class_id);
    const [data, setData] = useState('null')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        // declare the data fetching function
        const fetchData = async () => {
            const resAtten = await fetch('http://localhost:3001/util/getarraybyany/class_attendance/class_id/62002');
            const atten = await resAtten.json()
            console.log(atten);
        }

        // call the function
        fetchData()
            // make sure to catch any error
            .catch(console.error);
    }, [])

    return (
        <Container >
            <Tabs
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="mb-3 d-flex justify-content-center "
            // onClick={() => fetchMyAPI()}
            >
                {classes.map((cls, i) =>
                    <Tab key={i} eventKey={cls.class_id} title={`Sec ${i + 1}`} >
                        {cls.class_id}

                    </Tab>
                )}
            </Tabs>
        </Container>
    );
}

export default attendance;