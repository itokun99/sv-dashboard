import apiRequest from './config';
import { apiEndpoint } from './url';

const API = {};

API.getUsers = apiRequest.get(apiEndpoint.user);
API.updateUser = apiRequest.put(apiEndpoint.user);
API.deleteUser = apiRequest.delete(apiEndpoint.user);
API.insertUser = apiRequest.post(apiEndpoint.user);

export default API;
