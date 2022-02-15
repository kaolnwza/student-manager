import 'bootstrap/dist/css/bootstrap.min.css';

import Layout from './components/layout';
import Home from './Home';
import Manage from './Manage';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

function App() {
  return (
    <Router>
    <div >
      <Layout >
        <Routes>
          <Route path='/' exact element={<Home/>}/>
          <Route path='/manage' element={<Manage/>}/>
        </Routes>
        {/* <Home/> */}
      </Layout>
    </div>
    </Router>
  );
}

export default App;
