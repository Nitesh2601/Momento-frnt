
const API_BASE_URL =import.meta.env.VITE_APP_BACKEND_URL;

// const API_BASE_URL =
//   import.meta.env.MODE === 'production'
//     ? import.meta.env.VITE_APP_BACKEND_URL
//     : import.meta.env.VITE_APP_LOCAL_BACKEND_URL;

export default API_BASE_URL;

// console.log('MODE:', import.meta.env.MODE);
// console.log('VITE_APP_BACKEND_URL:', import.meta.env.VITE_APP_BACKEND_URL);
// console.log('VITE_APP_LOCAL_BACKEND_URL:', import.meta.env.VITE_APP_LOCAL_BACKEND_URL);
// console.log('Resolved API_BASE_URL:', API_BASE_URL);
