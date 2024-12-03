import { useEffect, useReducer, useRef } from 'react';
import { INITIAL_STATE, reducer } from './useReducer';

export const useApi = ({ searchType, endpoint, url }) => {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
    const dataCache = useRef({});

    useEffect(() => {
        const urlApi = import.meta.env.VITE_API_URL;
        const urlFetch = url ? url : `${urlApi}${endpoint}`;
        const cacheKey = `${searchType}-${endpoint}`;
        console.log("CACHÉ KEY:", cacheKey);
        console.log("EL GLOBAL:", dataCache.current[cacheKey]);
        const cachedData = dataCache.current[cacheKey] || null;
        console.log("EL GLOBAL:", cachedData);

        // Si los datos están en caché, úsalos
        if (searchType && cachedData) {
            dispatch({
                type: 'FETCH_SUCCESS',
                payload: cachedData,
            });
            console.log("USANDO DATOS DE CACHÉ:", cacheKey);
            return;
        }

        // Si no están en caché, haz el fetch
        dispatch({ type: 'FETCH_INIT' });

        fetch(urlFetch)
            .then((res) => res.json())
            .then((data) => {
                //console.log("Datos obtenidos del fetch:", data);

                const formattedData = {
                    product: data[0],
                    products: data,
                    user: data[0],
                    users: data,
                    categories: data,
                    category: data[0],
                };

                // Guarda los datos en caché
                dataCache.current[cacheKey] = formattedData;
                //console.log(formattedData, "DATOS GUARDADOS EN CACHÉ")

                dispatch({
                    type: 'FETCH_SUCCESS',
                    payload: formattedData,
                });
            })
            .catch((err) => {
                console.error("Error al obtener los datos:", err);
                dispatch({ type: 'FETCH_FAILURE', payload: err });
            });
    }, [ searchType, endpoint, url]);

    return { ...state };
};





