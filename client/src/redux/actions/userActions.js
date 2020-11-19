import axios from 'axios';

/* Types */
export const GET_USER_INFO = 'VHomes/user/GET_USER_INFO'

/* Actions */
export const setUserInfo = userData => ({type: GET_USER_INFO, payload: userData});
