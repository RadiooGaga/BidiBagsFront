import { useEffect, useReducer, useRef } from 'react';
import { INITIAL_STATE, reducer } from './useReducer';

export const useApi = ({ endpoint, url }) => {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
    const dataCache = useRef({}); // Referencia persistente para el caché

    useEffect(() => {
        const urlApi = import.meta.env.VITE_API_URL;
        const urlFetch = url ? url : `${urlApi}${endpoint}`;
     

        // tipo de dato del endpoint
        const getTypeofData = endpoint.split('/')[1];
        console.log("Tipo de dato del endpoint", getTypeofData);

        // Crear un cacheKey único para cada búsqueda
        const cacheKey = `${endpoint}`.replace(/^\/+/, '') 
        //console.log("Cache Key usado:", cacheKey);

        console.log("Contenido inicial de dataCache:", dataCache.current);
        const cachedData = dataCache.current[cacheKey];
        //console.log("DATOS DE CACHÉ ENCONTRADOS:", cachedData);

        if (cachedData) {
            //console.log("USANDO DATOS DE CACHÉ:", cachedData);
            dispatch({
                type: 'FETCH_SUCCESS',
                payload: cachedData, // Usamos los datos del caché
            });
            return; // Si los datos ya están en caché, no hacemos el fetch
        }

        // Si no están en caché, hacer el fetch
        dispatch({ type: 'FETCH_INIT' });
        fetch(urlFetch)
            .then((res) => res.json())
            .then((data) => {
                // Formatear los datos según el tipo de búsqueda
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

                console.log("Datos a guardar en caché:", formattedData);
                dataCache.current[cacheKey] = formattedData;
                console.log("Contenido de dataCache después de guardar:", dataCache.current);

                dispatch({
                    type: 'FETCH_SUCCESS',
                    payload: formattedData,
                });
            })
            .catch((err) => {
                console.error("Error al obtener los datos:", err);
                dispatch({ type: 'FETCH_FAILURE', payload: err });
            });
    }, [endpoint, url]);

    return { ...state };
};




