import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import './App.css';
import Login from './page/Login';
import Main from './page/Main';
import TypeSelect from './page/TypeSelect';
import HBType from './page/HBType';
import HBTypeResult from './page/HBTypeResult';
import AlphaBetaThalassemiaTest from './page/AlphaBetaThalassemiaTest';
import AlphaBetaThalassemiaResult from './page/AlphaBetaThalassemiaResult';
import AlphaBetaThalassemiaResult2 from './page/AlphaBetaThalassemiaResult2';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/main' element={<Main/>} />
        <Route path='/type-select' element={<TypeSelect/>} />
        <Route path='/hbtype' element={<HBType/>} />
        <Route path='/hbtyperesult' element={<HBTypeResult/>} />
        <Route path='/alpha-beta-thalassemia-test' element={<AlphaBetaThalassemiaTest/>} />
        <Route path='/alpha-beta-thalassemia-result' element={<AlphaBetaThalassemiaResult/>} />
        <Route path='/alpha-beta-thalassemia-result2' element={<AlphaBetaThalassemiaResult2/>} />
      </Routes>
    </Router>
  );
}


