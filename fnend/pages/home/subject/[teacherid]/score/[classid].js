import { useRouter } from 'next/router'


const score = () => {
    const router = useRouter()
    const { classid } = router.query
    return (<>
        {classid}
    </>);
}

export default score;