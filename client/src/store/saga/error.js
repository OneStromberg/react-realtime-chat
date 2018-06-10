import { message } from 'antd';

export default function* error(e){
  message.error(e.toString()); 
}