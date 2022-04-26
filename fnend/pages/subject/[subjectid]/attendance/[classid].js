import { useRouter } from 'next/router'


const attendance = () => {
    const router = useRouter()
    const { classid } = router.query
    console.log(router.query);
    return (<>
    {classid}</>);
}

export default attendance;