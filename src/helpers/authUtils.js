// import jwtDecode from 'jwt-decode';

/**
 * Checks if user is authenticated
 */
const isUserAuthenticated = () => {
  try {
    const user = getLoggedInUser();
    if (!user?.token) {
        return false;
    }
    return true;
    // const decoded = jwtDecode(user.token);
    // const currentTime = Date.now() / 1000;
    // if (decoded.exp > currentTime) {
    //     return true;
    // } else {
    //     console.warn('access token expired');
    //     return false;
    // }
  } catch (e) {
    localStorage.removeItem("user");
    return false;
  }
};

/**
 * Returns the logged in user
 */
const getLoggedInUser = () => {
  try {
    const user = localStorage.getItem('user');
    return JSON.parse(user);
  } catch (e) {
    return null;
  }
};

export { isUserAuthenticated, getLoggedInUser };