import { getLoggedInUser, isUserAuthenticated } from '../../helpers/authUtils';
import { LOGIN_USER, LOGIN_USER_FAILED, LOGIN_USER_SUCCESS, REGISTER_USER, REGISTER_USER_FAILED, REGISTER_USER_SUCCESS } from './constants';

const INIT_STATE = {
  isAuth: isUserAuthenticated(),
  userRole: getLoggedInUser()?.role || null,
  loading: false,
  error: null
}
const authReducer = (state = INIT_STATE, action)=> {
  switch (action.type) {
    case LOGIN_USER:
    case REGISTER_USER:
      return { ...state, loading: true };
    case LOGIN_USER_SUCCESS:
      localStorage.setItem("user", JSON.stringify(action.payload));
      console.log(action)
      return { ...state, loading: false, isAuth: true, error: null, userRole: action.payload?.role };
    case REGISTER_USER_SUCCESS:
      return { ...state, loading: false, isAuth: false, error: null, userRole: null };
    case LOGIN_USER_FAILED:
    case REGISTER_USER_FAILED:
      return { ...state, loading: false, isAuth: false, error: action.payload, userRole: null };
    default: return state;
  }
};
export default authReducer;