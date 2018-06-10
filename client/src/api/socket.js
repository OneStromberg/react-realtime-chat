import Nes from 'nes';
import { SOCKET_URI } from './../constants';
const client = new Nes.Client(SOCKET_URI);

export const subscribe = async (channel) => {
  await client.connect();
  return emit => {
    client.onUpdate = emit;
    const unsubscribe = () => {
      client.unsubscribe(channel)
    }
    return unsubscribe
  }
}