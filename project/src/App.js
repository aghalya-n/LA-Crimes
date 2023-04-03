import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/home';
import Page1 from './pages/page1';
import Page2 from './pages/page2';
import Page3 from './pages/page3';

function App() {
return (
    <Router>
        <Routes>
            <Route exact path='/' element={<Home/>} />
            <Route path='/Page1' element={<Page1/>} />
            <Route path='/Page2' element={<Page2/>} />
            <Route path='/Page3' element={<Page3/>} />
        </Routes>
    </Router>
);
}
  
export default App;