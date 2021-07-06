import React from 'react';
import { Redirect, Route } from 'react-router';

function Rutas({component: Component, ...props}) {

    const usuarioId = localStorage.getItem('AdministradorDeTareas/usuarioId');

    return <Route {...props} render={props => {return !usuarioId ? <Component {...props}/> : <Redirect to='/tareas' />}}/>
}

export default Rutas;
