// import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/HomePage.jsx';
import './App.css'
import CalculatorPage from './pages/CalculatorPage.jsx'


function App() {
//   const [count, setCount] = useState(0)

  return (
	<Routes>
		<Route path="/" element={<Home />} />
		<Route path="/calculator" element={<CalculatorPage />}/>
	</Routes>

      // <div>
      //   <div>
      //     <h1 className="title">Calculator</h1>
      //     <Calculator />
      //   </div>
      // </div>
  );
}

export default App
