import axios from "axios";

const httpClient = axios.create({});

httpClient.interceptors.request.use(request => {
  console.info(`Starting request to ${request.url}`);
  return request;
})

httpClient.interceptors.response.use(response => {
  console.info(`Finished request to ${response.config.url} with status ${response?.status}`);
  return response;
}, error => {
  console.error(`Finished request to ${error.config.url} with error ${error?.response?.status}`);
  return Promise.reject(error);
});

export default httpClient;