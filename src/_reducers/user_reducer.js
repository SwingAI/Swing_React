import { LOGIN_USER, REGISTER_USER, AUTH_USER } from '../_actions/types';

export default function(state = {}, action){
    switch (action.type) {
        case LOGIN_USER:
            return { ...state, loginSuccess: action.payload }
            break;
        case REGISTER_USER:
            return { ...state, register: action.payoad }
            break;
        case AUTH_USER:
            return { ...state, userData: action.payoad }
            break;
        default:
            return state;
    }
}