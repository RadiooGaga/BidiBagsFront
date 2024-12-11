import { useEffect, useReducer } from 'react';
import { INITIAL_STATE, reducer } from './useReducer';

export const useApi = ({ endpoint, url, useCache = true }) => {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

    useEffect(() => {
        // Definir la URL final para la API, tomando en cuenta la URL base y el endpoint
        const urlApi = import.meta.env.VITE_API_URL;
        const urlFetch = url || `${urlApi}${endpoint}`;

        // Si no se usa caché, hacemos la llamada a la API directamente
        if (!useCache) {
            fetchData(urlFetch);
            return;
        }

        // Crea un cacheKey único para cada búsqueda (elimina las barras iniciales y finales)
        const cacheKey = endpoint.replace(/^\/+|\/+$/g, '');
        const cachedData = JSON.parse(localStorage.getItem(cacheKey));

        if (cachedData) {
            console.log("USANDO DATOS DE CACHÉ:", cachedData);
            // Si los datos están en caché, actualizamos el estado con esos datos
            dispatch({
                type: 'FETCH_SUCCESS',
                payload: cachedData,
            });
            return; // Evitamos hacer la llamada a la API si ya tenemos datos en caché
        }

        // Si no hay datos en caché, hacemos la llamada a la API
        fetchData(urlFetch);

    }, [endpoint, url, useCache]); // Dependencias del useEffect

    // Función que hace la solicitud a la API
    const fetchData = (urlFetch) => {
        dispatch({ type: 'FETCH_INIT' });

        fetch(urlFetch)
            .then((res) => res.json())
            .then((data) => {
                // Formateamos los datos según el tipo de búsqueda
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

                // Si useCache es true, guardamos los datos en caché en localStorage
                if (useCache) {
                    const cacheKey = endpoint.replace(/^\/+|\/+$/g, '');
                    localStorage.setItem(cacheKey, JSON.stringify(formattedData)); 
                }

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
    };

    return { ...state };
};