
// Estado inicial para el reductor
export const INITIAL_STATE = {
    products: [],
    product: {},
    users: [],
    user: {},
    categories:[],
    category:{},
    loading: false,
    error: null,
  };
  
  // Función reductora para manejar las acciones
  export const reducer = (state, action) => {
    switch (action.type) {
      case 'FETCH_INIT':
        return { ...state, 
          loading: true, 
          error: null, 
          products: [], 
          product: {}, 
          users: [],
          user: {},
          categories:[], 
          category:{} 
        };
      case 'FETCH_SUCCESS':
        return {
          ...state,
          loading: false,
          products: action.payload.products, 
          product: action.payload.product,
          categories: action.payload.categories, 
          category: action.payload.category,
          users: action.payload.users, 
          user: action.payload.user,
        };
      case 'FETCH_FAILURE':
        return { ...state, 
          loading: false, 
          error: action.payload, 
          products: [], 
          product: {}, 
          users: [],
          user: {},
          categories:[], 
          category:{} 
        };
      default:
        throw new Error(`Acción no soportada: ${action.type}`);
    }
  };