import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Navbar from './components/Header';
import Footer from './components/Footer';
import Electric from './pages/Electric';
import Diesel from './pages/Diesel';
import Hybrid from './pages/Hybrid';
import LikesCommentsComponent from './components/Commentbox';
import AboutUs from './components/About';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}></Route>
                <Route path='/about' element={<AboutUs />}></Route>

        <Route path='/electric' element={<Electric />}></Route>
        <Route path='/diesel' element={<Diesel />}></Route>
        <Route path='/hybrid' element={<Hybrid />}></Route>
        <Route path='/comment' element={<LikesCommentsComponent />}></Route>
      </Routes>
     <Footer />
    </div>
  );
}

export default App;
