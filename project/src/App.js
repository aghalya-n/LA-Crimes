import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/home';
import Page2 from './pages/page2';
import Page3 from './pages/page3';
import Report from './pages/report';

function App() {
return (
    <Router>
        <Routes>
            <Route exact path='/' element={<Home/>} />
            <Route path='/report' element={<Report/>} />
            <Route path='/Page2' element={<Page2/>} />
            <Route path='/Page3' element={<Page3/>} />
        </Routes>
    </Router>
);
}
  
export default App;