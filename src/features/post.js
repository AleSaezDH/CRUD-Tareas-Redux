import db from '../firebase';

function postReducer (state = [], action) {
    switch (action.type) {
        case 'post/get' : return action.payload;
        case 'post/add' : return [...state, action.payload];
        case 'post/edit' : return state.map(x => x.id == action.payload.id ? action.payload : x);
        case 'post/delete' : return state.filter(x => x.id !== action.payload);
        default: return state;
    }
}

export function getPosts (idUsuario) {
    return async (dispatch) => {
        try {
            await db.collection('posts').where('autor', '==', idUsuario.usuarioId).get().then(data => {
                let posts = [];
                data.docs.map(post => {
                    posts.push ({...post.data(), id : post.id});
                });
                return dispatch({type: 'post/get', payload: posts});
            });
        } catch (error) {
            console.log(error);
        }
    }
}

export function addPosts (post) {
    return async (dispatch) => {
        try {
            await db.collection('posts').add(post).then((data) => {
                let postCompleto = {...post, id: data.id}
                return dispatch({type: 'post/add', payload: postCompleto});
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export function editPosts (tareaEditada) {
    return async (dispatch) => {
        try {
            await db.collection('posts').doc(tareaEditada.id).get().then(data => {
                data.ref.update(tareaEditada)});
            dispatch({type: 'post/edit', payload: tareaEditada});
        } catch (error) {
            console.log(error);
        }
    }
}

export function deletePosts (postId) {
    return async function addPostsFirebase (dispatch, state) {
        try {
            await db.collection('posts').doc(postId).delete();
            dispatch({type: 'post/delete', payload: postId});
        } catch (error) {
            console.log(error);
        }
    }
}


export default postReducer;