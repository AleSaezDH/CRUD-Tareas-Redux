import React, { useState } from 'react';
import db from '../firebase';
import {useHistory} from 'react-router-dom';
import Logos from '../react-redux.png';
import {Button, InputGroup, Alert, Form, FormGroup, FormControl, Loader} from 'rsuite';

function Home() {

    const [inputNombre, setInputNombre] = useState(false);
    const [user, setUser] = useState({name: ''});
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    async function handleClick (e) {
        e.preventDefault();
        setLoading(true);
        if (user.name.trim() === '') {
            return Alert.info('Por favor coloca un nombre', 5000);
        }

        try {
            let idUsuario = await db.collection('user').add(user).then(data => data.id);
            localStorage.setItem('AdministradorDeTareas/usuarioId', idUsuario);
            history.push('/tareas');
        } catch (error) {
            console.log(error);
        }
        }
    
    return (<>
        <div style={{display:'flex', justifyContent:'center', alignItems:'center', marginTop:120}}>
            <div style={{display:'flex', justifyContent:'center'}}>
                <img style={{marginRight:15}} src={Logos} width='300px'/>
                <div style={{display: 'flex', alignItems:'center', marginLeft:15}}>
                    <p style={{borderLeft:'3px solid #575757', fontSize:40, paddingLeft:20}}>Administrador de tareas personal</p>
                </div>
            </div>
        </div>
            {inputNombre ? 
            <div style={{marginTop:120}}>
                <Form formValue={user} onChange={({undefined}) => setUser({...user, name: undefined})}>
                    <FormGroup style={{width:300, margin:'0 auto'}}>
                        <InputGroup>
                            <FormControl placeholder='Coloca tu nombre'/>
                            {/*onChange={(e) => setUser({...user, [e.target.name] : e.target.value})}*/}
                            <InputGroup.Addon style={{cursor:'pointer'}}>
                                {loading ? <Loader /> : <p onClick={handleClick}>Siguiente</p>}
                            </InputGroup.Addon>
                        </InputGroup>
                    </FormGroup>
                </Form>
            </div> 
            : 
            <div style={{display:'flex', justifyContent:'center', marginTop:120}}>
                <Button appearance="primary" size="lg" onClick={() => setInputNombre(true)}>Comenzar</Button>
            </div>}
            </>
    )
}

export default Home
