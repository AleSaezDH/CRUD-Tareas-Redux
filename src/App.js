import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Tareas from './components/Tareas/Tareas';
import Home from './components/Home';
import Rutas from './Rutas';
import 'rsuite/dist/styles/rsuite-default.css'

function App() {
  return (
    <BrowserRouter>
    <Switch>
      <Rutas exact path='/' component={Home}/>
      <Route exact path='/tareas' component={Tareas}/>
    </Switch>
    </BrowserRouter>
  );
}

export default App;
