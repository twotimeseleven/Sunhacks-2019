import React from 'react';
import logo from './logo.svg';
import Routes from './routes'
import { BrowserRouter as Router } from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css'
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

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
