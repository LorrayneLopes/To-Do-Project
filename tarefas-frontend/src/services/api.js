import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const customError = {
      message: 'Erro de conexão com o servidor',
      status: error.response?.status || 500,
      data: error.response?.data || null
    };
    
    if (error.code === 'ECONNREFUSED' || error.code === 'ERR_NETWORK') {
      customError.message = 'Servidor indisponível. Verifique se a API está rodando.';
    } else if (error.response?.status === 404) {
      customError.message = 'Recurso não encontrado';
    } else if (error.response?.status >= 500) {
      customError.message = 'Erro interno do servidor';
    } else if (error.response?.data?.message) {
      customError.message = error.response.data.message;
    }
    
    return Promise.reject(customError);
  }
);

export default api;
