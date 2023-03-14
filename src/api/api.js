import axios from 'axios'
import Cookies from 'universal-cookie';

const onFulfilled = (config) => {
  const cookies = new Cookies();
  const accessToken = cookies.get('token')
	if (accessToken) {
		config.headers = {
			Authorization: `Bearer ${accessToken}`
		}
	}

	return config
}

const setupInterceptor = (instance) => {
  instance.interceptors.request.use(onFulfilled)
}

const instance = axios.create({
  baseURL: 'https://njs-301x-asm-3-server-xi.vercel.app/api',
});
setupInterceptor(instance)

const api = {
  login: (data) => instance.post('/users/login', data),
  signup: (data) => instance.post('/users/signup', data),
  getProduct: () => instance.get('/products'),
  getProductRating: () => instance.get('/products/rating'),
  getProductById: (id) => instance.get(`/products/${id}`), 
  getOrders: () => instance.get('/orders'),
  createOrder: (data) => instance.post('/orders', data),
  getOrderById: (id) => instance.get(`/orders/${id}`),

}

export default api