import React from 'react';
import './App.css';
import bgImg from './DashBoatWallpaper.jpg';
import SignUp from './routes/SignUp';

function App() {
  // Obtenir le chemin de l'URL actuelle
  const currentPath = window.location.pathname;

  // Rendre SignUp.js si le chemin est "/SignUp"
  if (currentPath === '/SignUp') {
    return (
      <div className="App">
        <SignUp />
      </div>
    );
  }

  // Sinon, afficher le reste du contenu
  return (
    <div className="App">
      <header>
        <nav className="nav-links">
          <a href="/Accueil">Accueil</a>
          <div className="nav-separator"></div>
          <a href="/Contact">Contact</a>
          <div className="nav-separator"></div>
          <a href="/Services">Services</a>
          <div className="nav-separator"></div>
          <a href="/Abouts">Abouts</a>
        </nav>
      </header>
      <body className="app-body" style={{ backgroundImage: `url(${bgImg})` }}>
        <h1>
          Learn quickly, and use the dashboard for register you'r favorite app !
        </h1>

        {/* Utilisez des liens <a> pour les boutons de connexion */}
        <div className='connectButton'>
          <a href="/SignUp" className="button"> Sign Up </a>
          <a href="/SignIn" className="button"> Sign In </a>
        </div>
      </body>
    </div>
  );
}

export default App;