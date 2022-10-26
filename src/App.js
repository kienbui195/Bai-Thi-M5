import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import DetailPage from './pages/Detail';
import CreatePage from './pages/Create';
import UpdatePage from './pages/Update';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/detail' element={<DetailPage />} />
        <Route path='/create' element={<CreatePage />} />
        <Route path='/edit' element={<UpdatePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
