import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/home';
import AdvancedQuery1 from './pages/advancedQuery1';
import AdvancedQuery2 from './pages/advancedQuery2';
import Report from './pages/report';

function App() {
return (
    <Router>
        <Routes>
            <Route exact path='/' element={<Home/>} />
            <Route path='/report' element={<Report/>} />
            <Route path='/advancedQuery1' element={<AdvancedQuery1/>} />
            <Route path='/advancedQuery2' element={<AdvancedQuery2/>} />
        </Routes>
    </Router>
);
}

export default App;
