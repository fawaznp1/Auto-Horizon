import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Navbar from './components/Header';
import Footer from './components/Footer';
import Electric from './pages/Electric';
import Diesel from './pages/Diesel';
import Hybrid from './pages/Hybrid';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/electric' element={<Electric />}></Route>
        <Route path='/diesel' element={<Diesel />}></Route>
        <Route path='/hybrid' element={<Hybrid />}></Route>
        <Route path='/' element={<Home />}></Route>
      </Routes>
     <Footer />
    </div>
  );
}

export default App;
