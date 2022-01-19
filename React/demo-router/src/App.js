import logo from './logo.svg';
import './App.css';
import { Route,Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import UserPage from './pages/UserPage';

export default function App(){
  return(
    <Routes>
      <Route exact path="/" element={<HomePage />} />    
      <Route exact path="/about" element={<AboutPage />} /> 
      <Route exact path="/:id" element={<UserPage />} />       
    </Routes>
  );
}