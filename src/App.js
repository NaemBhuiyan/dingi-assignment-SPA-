import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Layout from './layouts/Layout';

import AppProvider from './AppProvider';

const App = () => {
  return (
    <AppProvider>
      <Router basename={process.env.PUBLIC_URL}>
        <Layout />
      </Router>
    </AppProvider>
  );
};

export default App;
