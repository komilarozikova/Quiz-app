import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Html from './pages/Html'
import Css from './pages/Css'
import Javascript from './pages/Javascript'
import Accessibility from './pages/Accessibility'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz/HTML"  element={<Html />}/>
        <Route path="/quiz/CSS"  element={<Css />}/>
        <Route path="/quiz/JAVASCRIPT"  element={<Javascript />}/>
        <Route path="/quiz/ACCESSIBILITY"  element={<Accessibility />}/>
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;
