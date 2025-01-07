import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import InitialSetup from './components/InitialSetup';
// Importa otros componentes y rutas aquí

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/initial-setup" component={InitialSetup} />
        {/* Otras rutas aquí */}
      </Switch>
    </Router>
  );
};

export default App;
