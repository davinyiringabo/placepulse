/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/no-explicit-any */
import cookie from "react-cookies";
import { LOGIN_FAIL, LOGIN_SUCCESS } from "../actions/AuthActions"
import { decrypt, encrypt } from "../utils/crypto";
type AuthAction =  {
    type: string,
    payload: any,
    error: any,
    isLoggedIn: boolean,
}
const initialState = {
    isLoggedIn: false,
    user: null,
    token: null,
}

const loadState = () => {
    try {
      const serializedState = decrypt(JSON.stringify(cookie.load("Otate")));
      if (serializedState === null) {
        return initialState;
      }
      return JSON.parse(serializedState);
    } catch (err) {
      return initialState;
    }
  };

export const authReducer = (state = loadState(), action: AuthAction) =>{
    switch(action.type){
        case LOGIN_SUCCESS:
            const newState = {
                ...state,
                isLoggedIn: true,
                user: action.payload.user,
                token: action.payload.token,
              };
              cookie.save("Otate", encrypt(JSON.stringify(newState)), {
                path: "/"
              })
              return newState;
        case LOGIN_FAIL: 
            return {
                ...state,
                isLoggedIn: false,
                user: null,
                token: null
            }
        default:
            return state;
    }
}