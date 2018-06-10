import Action from './Action';
import { actionTypes } from './../constants'

export const sendMessage = ({email, message}) => Action(actionTypes.SEND_MESSAGE, { email, message })