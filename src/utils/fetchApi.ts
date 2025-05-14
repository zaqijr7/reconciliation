import axios, { AxiosInstance, AxiosRequestHeaders } from "axios";
// Define type for custom config
interface ApiConfig {
  baseURL?: string;
  headers?: Partial<AxiosRequestHeaders>;
}

// Function to create Axios instance dynamically
const createApiInstance = (
  headers: AxiosRequestHeaders,
  baseURL: string = process.env.NEXT_PUBLIC_API_URL as string,
): AxiosInstance => {
  return axios.create({
    baseURL,
    headers,
  });
};

// Function to fetch API instance with dynamic configurations
const fetchApi = async (
  customConfig: ApiConfig = {},
): Promise<AxiosInstance> => {
  const { baseURL, headers } = customConfig;
  return createApiInstance(headers as AxiosRequestHeaders, baseURL);
};

export default fetchApi;
