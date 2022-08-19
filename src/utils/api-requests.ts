import axios from 'axios';
import { IUser } from '../components/User/UserInterface';

export interface IApiRequest {
  url?: string | '',
  body?: IUser
}

export const baseUrl = 'https://dummyjson.com/users';

export const get = ({url}: IApiRequest) => {
  return axios.get(baseUrl + url);
};

export const post = ({ url, body }: IApiRequest) => {
  return axios.post(baseUrl + url, body);
};

export const put = ({ url, body }: IApiRequest) => {
  return axios.put(baseUrl + url, body);
};

export const deleteReq = ({ url }: IApiRequest) => {
  return axios.delete(baseUrl + url);
};

