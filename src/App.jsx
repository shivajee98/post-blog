import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BlogEditor from './components/BlogEditor.jsx';
import Profile from './components/Profile.jsx';
import BlogList from './components/BlogList.jsx';
import EditProfile from './components/EditProfile.jsx';
import BlogDetail from './components/BlogDetail.jsx';
import Background from './components/Background.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import Login from './components/Login.jsx';
import LogoutButton from './components/Logout.jsx';

import './index.css';

const App = () => {
  return (
    <Router>
      <Background />
      <AuthProvider>
        <div className="relative z-0">
          <Routes>
            <Route path="/" element={<PrivateRoute><BlogEditor /></PrivateRoute>} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<LogoutButton />} />
            <Route path="/profile/:userId" element={<PrivateRoute><Profile /></PrivateRoute>} />
            <Route path="/blog-list" element={<BlogList />} />
            <Route path="/edit-profile/:userId" element={<PrivateRoute><EditProfile /></PrivateRoute>} />
            <Route path="/blogs/:id" element={<PrivateRoute><BlogDetail /></PrivateRoute>} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;