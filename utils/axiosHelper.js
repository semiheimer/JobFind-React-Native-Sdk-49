import axios from "axios";
import { RAPID_API_KEY,RAPID_API_URL } from '@env';

const axiosInstance = axios.create({
	baseURL: RAPID_API_URL  ,
	headers: {
	  'X-RapidAPI-Key': RAPID_API_KEY,
	  'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
	},
  });
  
  axiosInstance.interceptors.request.use(
	(config) => {
	  return config;
	},
	(error) => {
	  return Promise.reject(error);
	}
  );
  
  axiosInstance.interceptors.response.use(
	(response) => {
	  return response.data.data;
	},
	(error) => {
	  return Promise.reject(error);
	}
  );
  
  export const get = (endpoint, query = null) => {
	return axiosInstance.request(endpoint,{params:{...query}});
  };