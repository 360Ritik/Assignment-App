import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import UserList from './components/UserList/UserList';
import UserForm from './components/UserForm/UserForm';
import WelcomePage from './components/WelcomePage/WelcomePage';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Demo Application</h1>
        </header>
        <Routes>
          <Route path="/users" element={<UserList />} />
          <Route path="/add-new-user" element={<UserForm />} />
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/" element={<Navigate to="/add-new-user" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
