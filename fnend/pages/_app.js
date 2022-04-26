import '../styles/globals.css'
import "../styles/styles.css";
import Head from 'next/head'
import Layout from '../components/layout'
import 'bootstrap/dist/css/bootstrap.css'
import { Container } from 'react-bootstrap';

function MyApp({ Component, pageProps }) {
  return (<Layout >
    <Head>
      <title>Student Management</title>
    </Head>
    <Container className="" style={{
      height: '100%',
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}>
      <Component {...pageProps} />
    </Container>
  </Layout>)
}

export default MyApp
