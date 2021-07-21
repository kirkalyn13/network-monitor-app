import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Footer from './components/Footer';
import SMSDashboard from './components/SMSDashboard';
import VoiceDashboard from './components/VoiceDashboard';
import DataDashboard from './components/DataDashboard';
import Outages from './components/Outages'

function App() {
  return (
    <Router>
      <div className="App">
      <Header />
      <div className="container-body">
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/sms">
            <SMSDashboard />
          </Route>
          <Route path="/voice">
            <VoiceDashboard />
          </Route>
          <Route path="/data">
            <DataDashboard />
          </Route>
          <Route path="/outages">
            <Outages />
          </Route>
        </Switch>
      </div>
      <Footer />
    </div>
    </Router>  
  );
}

export default App;
