// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './Header';
import ActivityPage from './ActivityPage';
import Login from './Login'; // Import the Login component
import SignUp from './SignUp';
import MyActivitiesPage from './MyActivitiesPage';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <Switch>
          <Route path="/" exact component={ActivityPage} />
          <Route path="/login" component={Login} /> 
          <Route path="/sign-up" component={SignUp} /> 
          <Route path="/my-activities" exact component={MyActivitiesPage} />
          {/* Add more routes here */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
