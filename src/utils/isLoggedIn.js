import getFromLocalStorage from "./getFromLocalStorage.js";


const isLoggedIn = () => {
    const authToken = getFromLocalStorage('Token')
    return !!authToken
}

export default isLoggedIn;
