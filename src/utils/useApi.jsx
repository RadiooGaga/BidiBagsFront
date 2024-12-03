import { useEffect, useReducer, useRef } from 'react';
import { INITIAL_STATE, reducer } from './useReducer';

export const useApi = ({ endpoint, searchType, url }) => {

    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
    const dataCache = useRef({});
    //console.log(dataCache, "DATACAHE")


    useEffect(() => {
        const urlApi = import.meta.env.VITE_API_URL
        const urlFetch = url ? url : `${urlApi}${endpoint}`;
        //console.log('URL Fetch:', urlFetch); 
        const cacheKey = `${searchType}-${endpoint}`;
        //console.log("CacheKey:", cacheKey);
        //console.log("Caché actual:", dataCache.current);
        //console.log("Contenido de dataCache.current[cacheKey]:", dataCache.current[cacheKey]);


        // Verifico si los datos están en caché 
        if (searchType && dataCache.current[cacheKey]) {
            console.log('Usando datos de caché para:', dataCache.current);
            dispatch({
                type: 'FETCH_SUCCESS',
                payload: {
                    products: dataCache.current[cacheKey].products,
                    product: dataCache.current[cacheKey].product,
                    users: dataCache.current[cacheKey].users,
                    user: dataCache.current[cacheKey].user,
                    categories: dataCache.current[cacheKey].categories,
                    category: dataCache.current[cacheKey].category,
                }, 
            });
            
            return;
        }

        dispatch({ type: 'FETCH_INIT' }); // Inicio de solicitud de datos

        fetch(urlFetch)
        .then((res) => res.json())
        .then((data) => {
        //console.log(data, "LOS DATOS"); 
        dataCache.current[cacheKey] = {
            product: data[0],
            products: data,
            user: data[0],
            users: data,
            categories: data,
            category: data[0]
        };
        dispatch({
        type: 'FETCH_SUCCESS',
        payload: { products: data, categories: data, users: data, product: data[0], category: data[0], user: data[0]
             },
        });
        })
        .catch((err) => {
            console.error('Error al obtener los datos:', err);
            dispatch({ type: 'FETCH_FAILURE', payload: err });
        });

    }, [endpoint, searchType, url]);
        
    return { ...state };
};





