import db from '../firebase';

function userReducer (state = [], action) {
    switch (action.type) {
        case 'user/get' : {
            return [...state, action.payload];
        }
        case 'user/add' : {
            return [...state, action.payload];
        }
        default: return state;
    }
}

export function createUser (userName) {
    return async function createUserFirebase (dispatch) {
        try {
            let idUsuario = await db.collection('user').add(userName).then(data => data.id);
            localStorage.setItem('AdministradorDeTareas/usuarioId', idUsuario);
            dispatch({type: 'user/add', payload: idUsuario});
        } catch (error) {
            console.log(error);
        }
    }
}
export default userReducer;