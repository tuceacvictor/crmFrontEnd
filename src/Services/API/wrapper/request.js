/**
 * Axios Request Wrapper
 * ---------------------
 *
 * @author  Sheharyar Naseer (@sheharyarn)
 * @license MIT
 *
 */

import axios from 'axios'

import history from "../../history";
/**
 * Create an Axios Client with defaults
 */

const client = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? "https://crm.tu4ka.tech" : "http://localhost:8080",
  withCredentials: false,
});

console.log((JSON.parse(localStorage.getItem('userData')) || {}).token);

/**
 * Request Wrapper with default success/error actions
 */
const request = function(options) {
  const onSuccess = function(response) {
    console.debug('Request Successful!', response);
    return response.data;
  };

  const onError = function(error) {

    console.error('Request Failed:', error.config);

    if (error.response) {
      // Request was made but server responded with something
      // other than 2xx
      console.error('Status:',  error.response.status);
      console.error('Data:',    error.response.data);
      console.error('Headers:', error.response.headers);
      if (error.response.status === 401) {
        console.log('auth failed');
        history.push('/login');
      }
    } else {
      // Something else happened while setting up the request
      // triggered the error
      console.error('Error Message:', error.message);
    }

    return Promise.reject(error.response || error.message);
  }

  return client(options)
            .then(onSuccess)
            .catch(onError);
}

export default request;
