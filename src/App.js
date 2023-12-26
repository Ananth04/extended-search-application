import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import ResultsPage from './components/ResultsPage';
import EntityDetailPage from './components/EntityDetailPage';

function App() {
  return (
    <Router>
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Switch>
          <Route exact path="/" component={LandingPage} /> {/* Landing page */}
          <Route exact path="/results" component={ResultsPage} /> {/* Results page */}
          <Route exact path="/entity/:id" component={EntityDetailPage} /> {/* Entity detail page */}
        </Switch>
      </header>
    </div>
    </Router>
  );
}

export default App;
