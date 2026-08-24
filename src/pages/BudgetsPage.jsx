import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import BudgetCard from '../components/BudgetCard';
import Footer from '../components/Footer';

// Data imports
import { budgets } from '../data/budgets';
import { cars } from '../data/cars';
import './Home.css';

function BudgetsPage() {
  const navigate = useNavigate();

  const handleBudgetClick = (budgetValue) => {
    // Navigate back to home page and pass budget as query param
    navigate(`/?budget=${encodeURIComponent(budgetValue)}&mode=budget`);
  };

  const getBudgetCount = (value) => {
    // default new cars count
    const matchesTab = (car) => !car.isUsed;
    if (value === '500000') {
      return cars.filter(car => car.price <= 500000 && matchesTab(car)).length;
    }
    if (value === '1000000') {
      return cars.filter(car => car.price > 500000 && car.price <= 1000000 && matchesTab(car)).length;
    }
    if (value === '1500000') {
      return cars.filter(car => car.price > 1000000 && car.price <= 1500000 && matchesTab(car)).length;
    }
    if (value === '2000000') {
      return cars.filter(car => car.price > 1500000 && car.price <= 2000000 && matchesTab(car)).length;
    }
    if (value === '3000000') {
      return cars.filter(car => car.price > 2000000 && car.price <= 3000000 && matchesTab(car)).length;
    }
    if (value === 'luxury') {
      return cars.filter(car => car.price > 3000000 && matchesTab(car)).length;
    }
    return 0;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* 1. Header */}
      <Header />

      {/* 2. Page Hero */}
      <div className="page-hero">
        <button className="page-back-btn" onClick={() => navigate('/')}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ display: 'inline' }}>
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back to Dashboard
        </button>
        <h1>Find Cars by Budget</h1>
        <p>Explore customized price guides to discover the best cars within your price bracket</p>
      </div>

      {/* 3. Budgets Grid */}
      <main style={{ flexGrow: 1 }} className="page-container">
        <div className="budgets-grid" style={{ margin: '0' }}>
          {budgets.map((budget) => {
            const dynamicCount = getBudgetCount(budget.value);
            return (
              <BudgetCard
                key={budget.id}
                budget={budget}
                dynamicCount={dynamicCount}
                onClick={handleBudgetClick}
              />
            );
          })}
        </div>
      </main>

      {/* 4. Footer */}
      <Footer />
    </div>
  );
}

export default BudgetsPage;
