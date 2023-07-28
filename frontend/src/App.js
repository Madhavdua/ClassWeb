import './App.css';
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
  Routes
} from "react-router-dom";


import Dashboard from './Components/Dashboard';
import Login from './Components/Login'
import Signup from './Components/Signup'
import Task from './Components/Task'
import Alert from './Components/Alert';
// context-> created context
// Context-> file with all context provider
import Context from './Components/Context';
import Enrolledgroups from './Components/Enrolledgroups';
import Welcome from './Components/Welcome';
import AdminLogin from './Components/AdminLogin';
import Bar from './Components/Bar';
import Workform from './Components/Workform';
function App() {
  return (
    <>
<Context>

    <Router>

      <div style={{ minHeight:"100vh"}}>
        <Bar/>
        <Workform/>
        
        <Alert/>
        <Routes>
          <Route exact path='/' element={<Welcome/>}></Route>
          <Route exact path='dashboard' element={<Dashboard/>}>
              <Route path='task' element={<Task/>}></Route>
              <Route path='groups' element={<Enrolledgroups/>}></Route>
              <Route path='?' element={<Enrolledgroups/>}></Route>
          </Route>

          <Route exact path='login' element={<Login/>}></Route>
          <Route exact path='adminlogin' element={<AdminLogin/>}></Route>
          <Route exact path='signup' element={<Signup/>}></Route>
        </Routes>
      </div>


    </Router>

</Context>
      
    </>
  );
}

export default App;
