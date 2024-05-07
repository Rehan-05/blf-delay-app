import axios from 'axios';
const apiUrl = 'https://metroappgateway.azurewebsites.net/blfDelay';

const api = axios.create({
  baseURL:apiUrl , 
});    

export const CallApi = async (method, url, data = null, headers = null) => {
  try {
    const response = await api({
      method,
      url,
      data,
      headers,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

//add header json type as application/json
export const SubmitCallApi = async (method, url, data) => {
  try {
    const response = await api({
      method,
      url,
      data,
      headers: {
        'Content-Type': 'application/json', // Set Content-Type header to application/json
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

