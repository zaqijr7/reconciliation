import axios, { AxiosInstance, AxiosRequestHeaders } from "axios";
// Import only the type, not the hook itself
import type { Action } from "../app/RootContext";
import { Dispatch } from "react";

// Define type for custom config
interface ApiConfig {
  baseURL?: string;
  headers?: Partial<AxiosRequestHeaders>;
  dispatch?: Dispatch<Action>; // Accept dispatch as a parameter
}

// Function to create Axios instance dynamically
const createApiInstance = (
  headers: AxiosRequestHeaders,
  baseURL: string = process.env.NEXT_PUBLIC_API_URL as string,
  dispatch?: Dispatch<Action>, // Add dispatch as an optional parameter
): AxiosInstance => {
  const instance = axios.create({
    baseURL,
    headers,
  });
  // Pasang response interceptor
  instance.interceptors.response.use(
    (response) => response, // jika response sukses, langsung return
    (error) => {
      if (error.response && error.response.status === 401 && dispatch) {
        // Jika status 401, lakukan logout (only if dispatch is provided)
        dispatch({
          type: "logout",
        });
      }
      // tetap lempar error agar bisa ditangani di caller
      return Promise.reject(error);
    },
  );

  return instance;
};

// Function to fetch API instance with dynamic configurations
const fetchApi = async (
  customConfig: ApiConfig = {},
): Promise<AxiosInstance> => {
  const { baseURL, headers, dispatch } = customConfig;
  return createApiInstance(headers as AxiosRequestHeaders, baseURL, dispatch);
};

export default fetchApi;
