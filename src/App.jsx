import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NewCarsPage from './pages/NewCarsPage';
import BrandsPage from './pages/BrandsPage';
import BodyTypesPage from './pages/BodyTypesPage';
import BudgetsPage from './pages/BudgetsPage';
import WhyUsPage from './pages/WhyUsPage';
import LoginPage from './pages/LoginPage';

/* 
  App Component
  The root container component of the Torque Talk application.
  In Phase 2, this file incorporates React Router to manage paths.
*/
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new-cars" element={<NewCarsPage />} />
        <Route path="/brands" element={<BrandsPage />} />
        <Route path="/body-types" element={<BodyTypesPage />} />
        <Route path="/budgets" element={<BudgetsPage />} />
        <Route path="/why-us" element={<WhyUsPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;

