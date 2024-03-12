import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Home';
import GenerateCard from './api/GenerateCard';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/api/generate_card" element={<GenerateCard />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
