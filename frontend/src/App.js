import logo from './logo.svg';
import './App.css';
import Register from './pages/RegisterPage';

import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/LoginPage';
import DashBoard from './pages/DashBoard';
import ListHeader from './components/ListHeader';
import CreateProject from './pages/CreateProject';
import ProjectList from './components/ProjectList';
import { useEffect } from 'react';
// import { messaging } from './firebase';
import toast, { Toaster } from 'react-hot-toast';
import { generateToken,messaging} from './notifications/firebase';
import { onMessage } from 'firebase/messaging';

const App=()=> {
  useEffect(() => {
    generateToken();
    onMessage(messaging,(payload)=>{
        console.log(payload);
        toast(payload.notification.body);
    })
  }, []);


  return (
    <div className="App" >
      {/* <ListHeader listname={'Taskify'}></ListHeader> */}
      <Toaster position='top-right'/>
      <Router>
        <Routes>
          <Route path='/register' element={<Register/>}></Route>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/login' element={<Login></Login>}></Route>
          <Route path='/dashboard' element={<DashBoard></DashBoard>}></Route>
          <Route path='/project' element={<ProjectList></ProjectList>}></Route>
          <Route path="/projects/new" element={<CreateProject />} />
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
