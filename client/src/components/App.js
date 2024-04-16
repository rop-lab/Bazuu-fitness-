import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter as Router

import Header from './Header';
import ActivityPage from './ActivityPage';

function App() {
  return (
    <Router> {/* Wrap your entire application with the Router component */}
      <div className="app">
        <Header />
        <ActivityPage />
      </div>
    </Router>
  );
}

export default App;
