import React, { useState } from 'react'
import {useSelector, useDispatch} from 'react-redux';
import {editPosts, deletePosts} from '../../features/post';
import { Panel, PanelGroup, Button, Icon, Input, Alert, Loader } from 'rsuite';

function ListadoTareas({usuarioId, loading}) {
    const posts = useSelector(state => state.post);
    const dispatch = useDispatch();
    const [tareaEditada, setTareaEditada] = useState({
        titulo: '',
        autor: usuarioId,
        contenido: ''
    })
    const [editar, setEditar] = useState('');
    const {titulo, contenido} = tareaEditada;

    if(loading && posts.length === 0) return <Loader size="md"  style={{marginTop: 130}}/>

    async function handleSaveEdit (ev, id) {
        ev.preventDefault();

        if ((titulo || contenido).trim() === '') {
            Alert.info('Por favor completa todos los campos');
        }
        
        try {
            tareaEditada.id = id;
            await dispatch(editPosts(tareaEditada));
            setEditar(0);
        } catch (error) {
            console.log(error);
        }
        Alert.success('Editada correctamente');
    }

    const handleEdit = (post) => {
        setTareaEditada({...tareaEditada, titulo: post.titulo, contenido: post.contenido});
        setEditar(post.id);
    }

    const handleDelete = async (id) => {
        await dispatch(deletePosts(id));
        Alert.success('Eliminada con éxito');
    }

    return (<>
        {posts.length === 0 ? 
        <> <div style={{display:'flex', flexDirection:'column', alignItems:'center', marginTop:50}}>
            <Icon icon='exclamation-circle2' size='4x' style={{color:'gold'}}/>
            <h3>Aún no tenes tareas creadas</h3>
        </div>
        <div style={{position: 'absolute', right: 40, bottom: 190, width: 100, textAlign:'center'}}>
            <h5>Comienza creando una</h5>
        </div>
        <Icon style={{position: 'absolute', right: 50, bottom: 100}} size="5x" icon={'sort-desc'}/>
        </>
        :
        <div style={{width: 700}}>
            <h3 style={{marginBottom:15}}>Tus Tareas</h3>
            {posts.map((post, index) => (
            editar == post.id ? 
            <PanelGroup key={index} accordion bordered style={{width:700}}>
                <form onChange={(e) => setTareaEditada({...tareaEditada, [e.target.name]:e.target.value})}>
                    <Panel header={<Input value={titulo} name='titulo'/>}>
                        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                            <div>
                            <Input value={contenido} name='contenido'/>
                            </div>
                            <Button onClick={(ev) => handleSaveEdit(ev, post.id)}>Guardar</Button>
                        </div>
                    </Panel>
                </form>
            </PanelGroup>
            :
            <PanelGroup key={index} accordion bordered style={{width:700}}>
                <Panel header={post.titulo}>
                    <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                        <div>
                            <p>{post.contenido}</p>
                        </div>
                        <div>
                            <Button style={{padding: 0}} appearance="link" onClick={() => handleEdit(post)}>Editar</Button>
                            <Button style={{padding: 0, marginLeft: 15}} appearance="link" onClick={() => handleDelete(post.id)}>Eliminar</Button>
                        </div>
                    </div>
                </Panel>
            </PanelGroup>
        ))}
        </div>
        }
        </>
    )
}

export default ListadoTareas
