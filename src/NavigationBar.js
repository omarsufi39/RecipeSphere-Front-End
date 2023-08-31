import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './NavigationBar.css';

function NavigationBar() {
  // Hooks to navigate between routes and get the current location
  const navigate = useNavigate();
  const location = useLocation();

// State variable to hold user authentication status
const [isAuthenticated, setIsAuthenticated] = useState(false);

// Fetch user authentication status from Django REST API
useEffect(() => {
  fetch('http://your-django-api-url/is-authenticated/', {// Replace with your Django API URL endpoint for checking user authentication status.
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming JWT token is stored in localStorage
    },
  })
  .then(response => response.json())
  .then(data => {
    setIsAuthenticated(data.isAuthenticated);
  })
  .catch(error => console.error('Error fetching authentication status:', error));
}, []); // Empty dependency array means this useEffect runs once after the initial render


  // Function to check if the current path is active
  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <div className="nav-container">
      {/* Navigation buttons with active state styling */}
      <button className={`nav-button ${isActive("/")}`} onClick={() => navigate("/")}>Home</button>
      {isAuthenticated ? (
        <>
          {/* Navigation buttons for authenticated users */}
          <button className={`nav-button ${isActive("/profile")}`} onClick={() => navigate("/profile")}>Profile</button>
          <button className={`nav-button ${isActive("/favorites")}`} onClick={() => navigate("/favorites")}>Favorite Recipes</button>
          {/* Missing buttons added */}
          <button className={`nav-button ${isActive("/create-recipe")}`} onClick={() => navigate("/create-recipe")}>Create Recipe</button>
          <button className={`nav-button ${isActive("/recipe-detail")}`} onClick={() => navigate("/recipe-detail")}>Recipe Detail</button>
          <button className={`nav-button ${isActive("/add-recipe")}`} onClick={() => navigate("/add-recipe")}>Add Recipe</button>
          <button className={`nav-button ${isActive("/edit-recipe")}`} onClick={() => navigate("/edit-recipe")}>Edit Recipe</button>
        </>
      ) : (
        <>
          {/* Navigation buttons for unauthenticated users */}
          <button className={`nav-button ${isActive("/signup-login")}`} onClick={() => navigate("/signup-login")}>Sign Up / Login</button>
        </>
      )}
      <button className={`nav-button ${isActive("/search-results")}`} onClick={() => navigate("/search-results")}>Search Recipe</button>
      <button className={`nav-button ${isActive("/contact-support")}`} onClick={() => navigate("/contact-support")}>Contact Support</button>
    </div>
  );
}


export default NavigationBar;  // Export the NavigationBar component for use in other parts of the application



