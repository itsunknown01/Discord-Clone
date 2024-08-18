import axios, { AxiosRequestConfig } from "axios";

export const getMethodhelper = async (
  apiUrl: string,
  config?: AxiosRequestConfig<any> | undefined
) => {
  const response = await axios.get(apiUrl, config);
  return response.data;
};
export const postMethodhelper = async (
  apiUrl: string,
  data: any,
  config?: AxiosRequestConfig<any> | undefined
) => {
  const response = await axios.post(apiUrl, data, config);
  return response.data;
};
export const putMethodhelper = async (
  apiUrl: string,
  data: any,
  config?: AxiosRequestConfig<any> | undefined
) => {
  const response = await axios.put(apiUrl, data, config);
  return response.data;
};
export const deleteMethodhelper = async (
  apiUrl: string,
  config?: AxiosRequestConfig<any> | undefined
) => {
  const response = await axios.delete(apiUrl, config);
  return response.data;
};
