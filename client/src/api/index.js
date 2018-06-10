//@flow
import axios from 'axios';
import { SERVER_URI } from './../constants';

export async function getMessages(count:number = 10) {
  const { data } = await axios.get(`${SERVER_URI}/messages?num=${count}`);
  return data;
}

export function sendMessage(email:string, message:string) {
  return axios.post(`${SERVER_URI}/messages`, {
    email,
    message
  })
}

export function lastActivity(email:string) {
  return axios.get(`${SERVER_URI}/last-activity?email=${email}`);
}