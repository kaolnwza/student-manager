import '../styles/globals.css'
import Layout from '../components/layout'
import 'bootstrap/dist/css/bootstrap.css'
import { Container } from 'react-bootstrap';

function MyApp({ Component, pageProps }) {
  return (<Layout >
    <Container className="text-center" style={{ marginTop: '5vw' }}>
      <Component {...pageProps} />
    </Container>
  </Layout>)
}

export default MyApp
