
import { useEffect, useState } from "react"
const Home = () => {
  const [data, setData] = useState('null')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  useEffect(
    () => {
      setLoading(true)
      fetch('https://api.github.com/users/iinitz')
        .then((res) => res.json())
        .then((json) => {
          setData(json)
          console.log(json.name);
        })
        .catch((error) => setError(error))
        .finally(() => setLoading(false))
    },
    [],
  )
  if (loading) {
    return (
      <div>Loading...</div>
    )
  }
  if (error) {
    return (
      <div>Error: {error.message}</div>
    )
  }
  return (<>

    <h1 >Home</h1>

    <div >{data.name}</div>
  </>
  )
}

export default Home;
