import React, { useState } from 'react';
import {useDispatch} from 'react-redux';
import {addPosts} from '../../features/post';
import { Modal, Button, Input, Alert } from 'rsuite';

function NewPost({button, setButton, usuarioId}) {

    const [newPost, setNewPost] = useState({
        titulo: '',
        autor: usuarioId,
        contenido: ''
    });
    const {titulo, contenido} = newPost;
    const dispatch = useDispatch();

    async function handleForm (e) {
        e.preventDefault();
        setButton(false)
        if ((titulo && contenido).trim() === '') {
            return Alert.info('Completa todos los campos');
        }
        await dispatch(addPosts(newPost));
        setNewPost({
            titulo: '',
            autor: usuarioId,
            contenido: ''
        });
        Alert.success('Tarea creada con éxito');
    }

    return (
        <>
        <div className="modal-container">
            <Modal show={button} onHide={() => setButton(false)}>
                <Modal.Header>
                    <Modal.Title>Nueva Tarea</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <form onChange={(e) => setNewPost({...newPost, [e.target.name]:e.target.value})}>
                    <label>Título</label>
                    <Input style={{marginTop: 10, marginBottom:20}} value={titulo} name='titulo'/>

                    <label>Contenido</label>
                    <Input style={{marginTop: 10, marginBottom:20}} componentClass="textarea" rows={3} value={contenido} name='contenido'/>
                </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleForm} appearance="primary"> Crear </Button>
                    <Button onClick={() => setButton(false)} appearance="subtle"> Cancelar </Button>
                </Modal.Footer>
            </Modal>
        </div>
        </>
    )
}

export default NewPost;
