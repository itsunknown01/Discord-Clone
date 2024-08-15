import axios from "axios";

export const getMethodhelper = async (apiUrl:string) => {
  const response = await axios.get(apiUrl);
  return response.data;
};
export const postMethodhelper = async (apiUrl: string,data: any) => {
    const response = await axios.post(apiUrl,data)
    return response.data
}
export const putMethodhelper = async (apiUrl: string,data:any) => {
    const response = await axios.put(apiUrl,data)
    return response.data
}
export const deleteMethodhelper = async (apiUrl: string) => {
    const response = await axios.delete(apiUrl)
    return response.data
}
