import React, { useEffect, useState } from 'react';
import NewPost from './NuevaTarea';
import Listadotareas from './ListadoTareas';
import {useDispatch} from 'react-redux';
import {Icon, Button} from 'rsuite';
import {getPosts} from '../../features/post';
import {useHistory} from 'react-router-dom';
import Logo from '../../rs.png';

function Tareas() {

    const usuarioId = localStorage.getItem('AdministradorDeTareas/usuarioId');
    const [button, setButton] = useState(false);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const history = useHistory();

        useEffect(() => {
            if (!usuarioId) {
                setTimeout(() => {
                    history.push('/');
                   }, 4000);
                return <div style={{display:'flex', justifyContent:'center', marginTop:60}}>
                <Icon style={{color:'red'}} size="5x" icon={'warning'}/>
                <h1 style={{marginLeft:10}}>No tienes acceso a esta ruta, te enviaremos a la home</h1>
                </div>
            } else {
                let id = {usuarioId}
                dispatch(getPosts(id));
                setLoading(false);
            }
        }, []);

    return (<>
        <div style={{display:'flex', justifyContent:'center', marginTop:50, height:'93%'}}>
            <NewPost button={button} setButton={setButton} usuarioId={usuarioId}/>
            <Listadotareas usuarioId={usuarioId} loading={loading}/>
        </div>
        <div style={{width:'100%', borderTop:'1px solid #929298', position:'fixed', bottom:0, backgroundColor:'white', display:'flex', justifyContent:'space-between', alignItems:'center', paddingRight:30, height:'7%'}}>
            <a href='https://rsuitejs.com/' target='_blank'><img src={Logo} width={150}/></a>
            <div>
                <Button appearance="primary" onClick={() => setButton(true)} style={{}}>Nueva tarea</Button>
            </div>
        </div>
        </>
    )
}

export default Tareas
