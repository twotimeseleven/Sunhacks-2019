import React from 'react';
import logo from './logo.svg';
import Routes from './routes'
import { BrowserRouter as Router } from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css'

function App() {
  return (
    <div className="background">
    <div>
      <Router>
        <Routes/>
      </Router>
      </div>
    </div>
  );
}

export default App;
