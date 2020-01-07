import React from 'react'
import { BrowserRouter as Router } from "react-router-dom"

import Main from './routes/Main';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Main />
      </Router>
    </div >
  );
}

export default App;
