import { useEffect, useReducer, useContext } from 'react';
import { INITIAL_STATE, reducer } from './useReducer';
import { useAuth } from './AuthContext';
import { useApiProvider } from './ApiContext';

export const useApi = ({ endpoint, url }) => {
    const { user } = useAuth();
    const { apiUrl } = useApiProvider();
    //const urlApi = import.meta.env.VITE_API_URL;
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

    useEffect(() => {
      
        const urlFetch = url || `${apiUrl}${endpoint}`;
        
        // Crea un cacheKey único para cada búsqueda (elimina las barras iniciales y finales)
        const cacheKey = endpoint.replace(/^\/+|\/+$/g, ''); 
        // Comprueba si el caché ya contiene datos para esta clave
        const cachedData = user && user.rol !== 'admin' ? JSON.parse(localStorage.getItem(cacheKey)) : null;

        if (cachedData) {
            // Si encontramos los datos en el caché, los usamos en el payload
            console.log("USANDO DATOS DE CACHÉ:", cachedData);
            dispatch({
                type: 'FETCH_SUCCESS',
                payload: cachedData,
            });
            return; 
        }

        dispatch({ type: 'FETCH_INIT' });
        fetch(urlFetch)
            .then((res) => res.json())
            .then((data) => {
                // Formateamos los datos según el tipo de búsqueda (según el tipo de endpoint)
                const getTypeofData = endpoint.split('/')[1];
                const formattedData = {
                    products: getTypeofData === 'products' ? data : [],
                    product: getTypeofData === 'product' ? data[0] : {},
                    users: getTypeofData === 'users' ? data : [],
                    user: getTypeofData === 'user' ? data[0] : {},
                    posts: getTypeofData === 'blog' ? data : [],
                    post: getTypeofData === 'latest-post' ? data : {},
                    categories: getTypeofData === 'categories' ? data : [],
                    category: getTypeofData === 'category' ? data[0] : {},
                };

                // Guardamos los datos en caché en localStorage
                localStorage.setItem(cacheKey, JSON.stringify(formattedData)); 

                // Despachamos los datos al estado
                dispatch({
                    type: 'FETCH_SUCCESS',
                    payload: formattedData,
                });
            })
            .catch((err) => {
                console.error("Error al obtener los datos:", err);
                dispatch({ type: 'FETCH_FAILURE', payload: err });
            });
    }, [endpoint, apiUrl, url]); 

    return { ...state };
};




