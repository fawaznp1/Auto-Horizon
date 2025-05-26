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
import VintageCars from './pages/Vintage';
import ModernCarsBlog from './pages/Latest';
import LatestCars from './pages/Latest';
import JoinUsComponent from './pages/Joinus';
import FeaturedCarSection from './pages/Featured';
import CarShowcase from './pages/Blog';

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
                <Route path='/vintage' element={<VintageCars />}></Route>
        <Route path='/latest' element={<LatestCars />}></Route>
<Route path='/join' element={<JoinUsComponent />}></Route>
<Route path='/featured' element={<FeaturedCarSection />}></Route>
<Route path='/blog' element={<CarShowcase />}></Route>

      </Routes>
     <Footer />
    </div>
  );
}

export default App;
