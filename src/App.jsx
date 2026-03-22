// import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/HomePage.jsx';
import './App.module.css';
import CalculatorPage from './pages/CalculatorPage.jsx';
import LogInPage from './pages/LoginPage.jsx';
import MenuPage from './pages/MenuPage.jsx';import HistoryPage from './pages/HistoryPage.jsx';
import Details from './components/History/Details.jsx';


function App() {
    //   const [count, setCount] = useState(0)

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/calculator" element={<CalculatorPage />} />
            <Route path="/login" element={<LogInPage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/history" element={<HistoryPage />}/>
            <Route path="/details/:id" element={<Details />}/>
        </Routes>

        // <div>
        //   <div>
        //     <h1 className="title">Calculator</h1>
        //     <Calculator />
        //   </div>
        // </div>
    );
}

export default App;
