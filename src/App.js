import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import './App.css';
import Login from './page/Login';
import Main from './page/Main';
import TypeSelect from './page/TypeSelect';
import HBType from './page/HBType';
import HBTypeResult from './page/HBTypeResult';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/main' element={<Main/>} />
        <Route path='/type-select' element={<TypeSelect/>} />
        <Route path='/hbtype' element={<HBType/>} />
        <Route path='/hbtyperesult' element={<HBTypeResult/>} />
      </Routes>
    </Router>
  );
}

export default App;
