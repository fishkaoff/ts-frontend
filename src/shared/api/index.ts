import axios, {
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";

const $host = axios.create({
  baseURL: "/api",
  headers: {
    Accepts: "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

const $authHost = axios.create({
  // baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
  baseURL: "/api",
  headers: {
    Accepts: "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

const authInterceptor = (
  config: InternalAxiosRequestConfig,
): InternalAxiosRequestConfig => {
  config.headers = config.headers || {};
  config.headers.Authorization = `Bearer ${localStorage.getItem("shop-saby-access-token")}`;
  return config;
};

const onResponseInterceptor = (response: AxiosResponse): AxiosResponse => {
  return response;
};

// const onResponseErrorInterceptor = (error: AxiosError): Promise<AxiosError> => {
//   if (error.response?.status === 401) {
//     const userStore = useUserStore()
//     userStore.isAuthorized = false
//     router.push({ name: 'login' })
//   }
//   return Promise.reject(error)
// }

$authHost.interceptors.request.use(authInterceptor);
$authHost.interceptors.response.use(onResponseInterceptor);

export { $host, $authHost };
